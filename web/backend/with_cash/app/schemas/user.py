from pydantic import BaseModel, EmailStr
from enum import Enum

class UserRole(str, Enum):
    guest = "guest"
    client = "client"
    admin = "admin"

class UserBase(BaseModel):
    email: EmailStr
    role: UserRole = UserRole.client

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str