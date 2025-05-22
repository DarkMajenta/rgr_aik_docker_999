from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..config.database import get_db
from ..models.dish import Dish
from ..schemas.dish import DishCreate, DishResponse

router = APIRouter()

@router.get("/", response_model=List[DishResponse])
async def get_dishes(db: Session = Depends(get_db)):
    return db.query(Dish).all()

@router.post("/", response_model=DishResponse)
async def create_dish(dish: DishCreate, db: Session = Depends(get_db)):
    db_dish = Dish(**dish.dict())
    db.add(db_dish)
    db.commit()
    db.refresh(db_dish)
    return db_dish