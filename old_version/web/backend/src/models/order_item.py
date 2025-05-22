from sqlalchemy import Column, Integer, ForeignKey
from ..config.database import Base

class OrderItem(Base):
    __tablename__ = "order_items"

    order_id = Column(Integer, ForeignKey("orders.id"), primary_key=True)
    dish_id = Column(Integer, ForeignKey("dishes.id"), primary_key=True)
    quantity = Column(Integer)