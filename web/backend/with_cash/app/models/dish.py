from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Dish(Base):
    __tablename__ = "dishes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    image = Column(Text)
    portion_size = Column(Text)
    technology = Column(Text)
    preparation_time = Column(Integer)
    dish_type_id = Column(Integer, ForeignKey("dish_types.id"))
    created_at = Column(DateTime, default=func.now())