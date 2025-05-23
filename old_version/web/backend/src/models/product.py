from sqlalchemy import Column, Integer, String
from ..config.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    weight = Column(Integer)
    calories = Column(Integer)
    quantity = Column(Integer)