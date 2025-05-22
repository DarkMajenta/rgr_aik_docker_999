from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import require_role
from app.models.dish import Dish
from app.models.user import User
from app.schemas.dish import DishCreate, Dish
from app.schemas.user import User

router = APIRouter()

@router.post("/dishes", response_model=Dish)
async def create_dish(dish: DishCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    db_dish = Dish(**dish.dict())
    db.add(db_dish)
    db.commit()
    db.refresh(db_dish)
    return db_dish

@router.get("/users", response_model=list[User])
async def get_users(db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    return db.query(User).all()