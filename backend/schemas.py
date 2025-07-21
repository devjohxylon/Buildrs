from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class WaitlistCreate(BaseModel):
    email: EmailStr

class WaitlistResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    message: str

    class Config:
        from_attributes = True 