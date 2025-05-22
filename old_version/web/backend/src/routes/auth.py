from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from ..config.database import get_db
from ..models.user import User, UserRole
from ..schemas.user import UserCreate, UserResponse
from ..schemas.client import ClientCreate, ClientResponse
from ..middleware.auth import create_access_token, get_current_user
import bcrypt

router = APIRouter()

SECRET_KEY = "your_jwt_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = User(email=user.email, password=hashed_password.decode('utf-8'), role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    if user.role == UserRole.client:
        db_client = Client(user_id=db_user.id)
        db.add(db_client)
        db.commit()
        db.refresh(db_client)
    
    return db_user

@router.post("/login")
async def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role.value})
    return {"access_token": access_token, "token_type": "bearer"}