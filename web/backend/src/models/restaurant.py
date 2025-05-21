from sqlalchemy import Column, Integer, String
from ..config.database import Base

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(String, nullable=False)
    cuisine_type = Column(String(100))