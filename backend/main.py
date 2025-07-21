from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import os
from decouple import config

from database import SessionLocal, engine
from models import Base, WaitlistEntry
from schemas import WaitlistCreate, WaitlistResponse

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Buildrs API",
    description="Backend API for Buildrs - Developer Collaboration Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://buildrs.vercel.app",
        "https://*.vercel.app",
        "https://buildrs.dev",
        "https://*.buildrs.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        db_entry = WaitlistEntry(
            email=waitlist_entry.email,
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
    except Exception as e:
        db.rollback()
        if "Email already on waitlist" in str(e):
            raise e
        raise HTTPException(status_code=500, detail="Failed to add to waitlist")

@app.get("/waitlist/count")
async def get_waitlist_count(db: Session = Depends(get_db)):
    """Get total number of waitlist signups"""
    count = db.query(WaitlistEntry).count()
    return {"count": count}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 