from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..config.database import get_db
from ..models.restaurant import Restaurant
from ..schemas.restaurant import RestaurantCreate, RestaurantResponse

router = APIRouter()

@router.get("/", response_model=List[RestaurantResponse])
async def get_restaurants(db: Session = Depends(get_db)):
    return db.query(Restaurant).all()

@router.post("/", response_model=RestaurantResponse)
async def create_restaurant(restaurant: RestaurantCreate, db: Session = Depends(get_db)):
    db_restaurant = Restaurant(**restaurant.dict())
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant