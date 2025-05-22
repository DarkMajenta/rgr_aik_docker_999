from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt
from google.auth.transport.requests import Request
from google.oauth2 import id_token
from app.core.config import settings
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.user import User
from app.schemas.user import UserCreate, Token
import redis
import bcrypt
import os

router = APIRouter()
redis_client = redis.Redis.from_url(settings.REDIS_URL)

@router.post("/register", response_model=Token)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = User(email=user.email, password=hashed_password.decode('utf-8'), role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    token = jwt.encode({"sub": db_user.id}, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    redis_client.setex(f"session:{db_user.id}", 3600, token)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not bcrypt.checkpw(form_data.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = jwt.encode({"sub": user.id}, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    redis_client.setex(f"session:{user.id}", 3600, token)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/oauth2/google", response_model=Token)
async def google_login(token: str, db: Session = Depends(get_db)):
    try:
        idinfo = id_token.verify_oauth2_token(token, Request(), settings.GOOGLE_CLIENT_ID)
        email = idinfo['email']
        user = db.query(User).filter(User.email == email).first()
        if not user:
            user = User(email=email, password="google_oauth", role="client")
            db.add(user)
            db.commit()
            db.refresh(user)
        jwt_token = jwt.encode({"sub": user.id}, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
        redis_client.setex(f"session:{user.id}", 3600, jwt_token)
        return {"access_token": jwt_token, "token_type": "bearer"}
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Google token")