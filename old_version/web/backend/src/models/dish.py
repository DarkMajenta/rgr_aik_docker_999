from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from ..config.database import Base

class Dish(Base):
    __tablename__ = "dishes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    image = Column(String)
    portion_size = Column(String)
    technology = Column(String)
    preparation_time = Column(Integer)
    dish_type_id = Column(Integer, ForeignKey("dish_types.id"))
    created_at = Column(DateTime, default=func.now())