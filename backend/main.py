from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import os
from decouple import config

from database import SessionLocal, engine
from models import Base, WaitlistEntry
from schemas import WaitlistCreate, WaitlistResponse

# Create database tables
Base.metadata.create_all(bind=engine)

class CustomHeaderMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        # Add security headers
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        # Add cache control headers for API responses
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        return response

app = FastAPI(
    title="Buildrs API",
    description="Backend API for Buildrs - Developer Collaboration Platform",
    version="1.0.0",
    docs_url="/docs" if config('ENVIRONMENT', default='development') == 'development' else None,
    redoc_url="/redoc" if config('ENVIRONMENT', default='development') == 'development' else None
)

# Security middleware
app.add_middleware(CustomHeaderMiddleware)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[
        "buildrs-production.up.railway.app",
        "*.railway.app",
        "buildrs.net",
        "www.buildrs.net",
        "localhost"  # Allow localhost for development
    ]
)

# CORS middleware - more restrictive and organized
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://buildrs.vercel.app",
        "https://*.vercel.app",
        "https://buildrs.net", 
        "https://www.buildrs.net",
        "http://localhost:3000",  # Local development only
        "http://127.0.0.1:3000"   # Local development only
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "User-Agent"],
    expose_headers=["Content-Length", "Content-Type"]
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Buildrs API is running! 🚀", "version": "1.0.0", "status": "healthy"}

@app.get("/health")
async def health_check():
    try:
        # Test database connection
        db = SessionLocal()
        db.execute("SELECT 1")
        db.close()
        return {
            "status": "healthy", 
            "timestamp": datetime.utcnow(),
            "database": "connected",
            "version": "1.0.0"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "timestamp": datetime.utcnow(),
            "database": "disconnected",
            "error": str(e)
        }

@app.post("/waitlist", response_model=WaitlistResponse)
async def add_to_waitlist(waitlist_entry: WaitlistCreate, db: Session = Depends(get_db)):
    """Add email to waitlist"""
    try:
        # Validate email format is already handled by Pydantic EmailStr
        email = waitlist_entry.email.lower().strip()
        
        # Check if email already exists
        existing_entry = db.query(WaitlistEntry).filter(WaitlistEntry.email == email).first()
        if existing_entry:
            raise HTTPException(status_code=400, detail="Email already on waitlist")
        
        # Create new waitlist entry
        db_entry = WaitlistEntry(
            email=email,
            created_at=datetime.utcnow()
        )
        db.add(db_entry)
        db.commit()
        db.refresh(db_entry)
        
        return WaitlistResponse(
            id=db_entry.id,
            email=db_entry.email,
            created_at=db_entry.created_at,
            message="Successfully added to waitlist! 🎉"
        )
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to add to waitlist")

@app.get("/waitlist/count")
async def get_waitlist_count(db: Session = Depends(get_db)):
    """Get total number of waitlist signups"""
    try:
        count = db.query(WaitlistEntry).count()
        return {"count": count, "timestamp": datetime.utcnow()}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch waitlist count")

# Add error handler for better error responses
@app.exception_handler(500)
async def internal_server_error_handler(request: Request, exc: Exception):
    return {
        "error": "Internal server error",
        "message": "Something went wrong on our end",
        "timestamp": datetime.utcnow()
    }

@app.exception_handler(404)
async def not_found_handler(request: Request, exc: Exception):
    return {
        "error": "Not found",
        "message": "The requested resource was not found",
        "timestamp": datetime.utcnow()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 