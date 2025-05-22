from pydantic import BaseModel

class RestaurantBase(BaseModel):
    name: str
    address: str
    cuisine_type: str

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantResponse(RestaurantBase):
    id: int

    class Config:
        orm_mode = True