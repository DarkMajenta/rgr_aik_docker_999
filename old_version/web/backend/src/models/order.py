from sqlalchemy import Column, Integer, ForeignKey, Numeric, Enum, DateTime, JSON
from sqlalchemy.sql import func
from ..config.database import Base
import enum

class OrderStatus(str, enum.Enum):
    pending = "pending"
    preparing = "preparing"
    delivering = "delivering"
    completed = "completed"
    cancelled = "cancelled"

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id", ondelete="SET NULL"))
    items = Column(JSON, nullable=False)
    total_price = Column(Numeric(10, 2), nullable=False, default=0.00)
    status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.pending)
    created_at = Column(DateTime, default=func.now())
    order_date = Column(DateTime, default=func.now())