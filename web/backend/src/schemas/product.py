from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    weight: Optional[int]
    calories: Optional[int]
    quantity: Optional[int]

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int

    class Config:
        orm_mode = True