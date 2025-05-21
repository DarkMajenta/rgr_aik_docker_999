from pydantic import BaseModel
from typing import List, Dict
from enum import Enum

class OrderStatus(str, Enum):
    pending = "pending"
    preparing = "preparing"
    delivering = "delivering"
    completed = "completed"
    cancelled = "cancelled"

class OrderItemCreate(BaseModel):
    dish_id: int
    quantity: int

class OrderCreate(BaseModel):
    client_id: int
    items: List[Dict[str, int]]
    total_price: float
    status: OrderStatus = OrderStatus.pending

class OrderResponse(BaseModel):
    id: int
    client_id: int
    items: List[Dict[str, int]]
    total_price: float
    status: OrderStatus
    created_at: str
    order_date: str

    class Config:
        orm_mode = True