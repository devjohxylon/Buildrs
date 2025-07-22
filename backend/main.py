from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import os
from decouple import config
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

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
        return response

app = FastAPI(
    title="Buildrs API",
    description="Backend API for Buildrs - Developer Collaboration Platform",
    version="1.0.0"
)

# Security middleware
app.add_middleware(CustomHeaderMiddleware)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[
        "buildrs-production.up.railway.app",
        "*.railway.app",
        "buildrs.net",
        "www.buildrs.net"
    ]
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://buildrs.vercel.app",
        "https://*.vercel.app",
        "https://buildrs.net",
        "https://www.buildrs.net",
        "http://localhost:3000"  # Only allow HTTP for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
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
    return {"message": "Buildrs API is running! 🚀"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/waitlist", response_model=WaitlistResponse)
async def add_to_waitlist(waitlist_entry: WaitlistCreate, db: Session = Depends(get_db)):
    """Add email to waitlist"""
    try:
        # Check if email already exists
        existing_entry = db.query(WaitlistEntry).filter(WaitlistEntry.email == waitlist_entry.email).first()
        if existing_entry:
            raise HTTPException(status_code=400, detail="Email already on waitlist")
        
        # Create new waitlist entry
        new_entry = WaitlistEntry(email=waitlist_entry.email)
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)
        return WaitlistResponse(id=new_entry.id, email=new_entry.email, created_at=new_entry.created_at, message="Successfully added to waitlist")
    except Exception as e:
        logging.error(f"Error adding to waitlist: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/waitlist/count")
async def get_waitlist_count(db: Session = Depends(get_db)):
    """Get total count of waitlist entries"""
    try:
        count = db.query(WaitlistEntry).count()
        return {"count": count}
    except Exception as e:
        logging.error(f"Error getting waitlist count: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 