from pydantic import BaseModel
from typing import List, Dict
from enum import Enum

class OrderStatus(str, Enum):
    pending = "pending"
    preparing = "preparing"
    delivering = "delivering"
    completed = "completed"
    cancelled = "cancelled"

class OrderItem(BaseModel):
    dish_id: int
    quantity: int

class OrderBase(BaseModel):
    client_id: int
    items: List[Dict]
    total_price: float

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    status: OrderStatus
    created_at: str
    order_date: str

    class Config:
        orm_mode = True