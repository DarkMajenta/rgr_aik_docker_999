from sqlalchemy import Column, Integer, String, ForeignKey
from ..config.database import Base

class RestaurantDish(Base):
    __tablename__ = "restaurant_dishes"

    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), primary_key=True)
    dish_id = Column(Integer, ForeignKey("dishes.id"), primary_key=True)
    name = Column(String(255))