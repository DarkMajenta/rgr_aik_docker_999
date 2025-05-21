from pydantic import BaseModel
from typing import Optional

class DishBase(BaseModel):
    name: str
    image: Optional[str]
    portion_size: Optional[str]
    technology: Optional[str]
    preparation_time: Optional[int]
    dish_type_id: Optional[int]

class DishCreate(DishBase):
    pass

class DishResponse(DishBase):
    id: int
    created_at: str

    class Config:
        orm_mode = True