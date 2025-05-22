from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.models.dish import Dish
from app.schemas.dish import Dish
import redis
import json

router = APIRouter()
redis_client = redis.Redis.from_url(settings.REDIS_URL)

@router.get("/", response_model=list[Dish])
async def get_menu(
    db: Session = Depends(get_db),
    dish_type_id: int | None = Query(None, description="Filter by dish type ID"),
    min_price: float | None = Query(None, description="Minimum price"),
    max_price: float | None = Query(None, description="Maximum price")
):
    cache_key = f"menu:{dish_type_id}:{min_price}:{max_price}"
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    query = db.query(Dish)
    if dish_type_id:
        query = query.filter(Dish.dish_type_id == dish_type_id)
    # Note: Price filtering requires adding a price column to dishes table
    dishes = query.all()
    redis_client.setex(cache_key, 3600, json.dumps([dish.__dict__ for dish in dishes]))
    return dishes