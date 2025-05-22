from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..config.database import get_db
from ..models.order import Order, OrderStatus
from ..models.order_item import OrderItem
from ..schemas.order import OrderCreate, OrderResponse
from ..middleware.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=OrderResponse)
async def create_order(order: OrderCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role != "client":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db_order = Order(
        client_id=order.client_id,
        items=order.items,
        total_price=order.total_price,
        status=order.status
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    for item in order.items:
        db_item = OrderItem(order_id=db_order.id, dish_id=item["dish_id"], quantity=item["quantity"])
        db.add(db_item)
    
    db.commit()
    return db_order

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if current_user.role != "admin" and order.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return order