from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.order import Order
from app.models.user import User
from app.schemas.order import OrderCreate, Order
from stripe import Stripe
from app.core.config import settings

router = APIRouter()
stripe = Stripe(settings.STRIPE_SECRET_KEY)

@router.post("/", response_model=Order)
async def create_order(order: OrderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "client":
        raise HTTPException(status_code=403, detail="Only clients can create orders")
    db_order = Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/{id}", response_model=Order)
async def get_order(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = db.query(Order).filter(Order.id == id, Order.client_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/payment")
async def create_payment(amount: float, currency: str = "usd", payment_method: str, current_user: User = Depends(get_current_user)):
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency=currency,
            payment_method=payment_method,
            confirm=True,
        )
        return {"client_secret": payment_intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))