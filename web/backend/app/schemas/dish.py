from pydantic import BaseModel

class DishBase(BaseModel):
    name: str
    portion_size: str | None
    preparation_time: int | None
    dish_type_id: int

class DishCreate(DishBase):
    image: str | None = None
    technology: str | None = None

class Dish(DishBase):
    id: int
    created_at: str

    class Config:
        from_attributes = True