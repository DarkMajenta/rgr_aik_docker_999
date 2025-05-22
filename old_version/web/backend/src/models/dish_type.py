from sqlalchemy import Column, Integer, String
from ..config.database import Base

class DishType(Base):
    __tablename__ = "dish_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)