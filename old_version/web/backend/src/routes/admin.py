from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..config.database import get_db
from ..models.user import User
from ..models.dish import Dish
from ..models.order import Order
from ..schemas.user import UserResponse
from ..schemas.dish import DishResponse
from ..schemas.order import OrderResponse
from ..middleware.auth import get_current_user

router = APIRouter()

@router.get("/users", response_model=List[UserResponse])
async def get_users(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(User).all()

@router.get("/orders", response_model=List[OrderResponse])
async def get_all_orders(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Order).all()