from pydantic import BaseModel
from typing import Optional

class ClientBase(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    address: Optional[str]

class ClientCreate(ClientBase):
    user_id: int

class ClientResponse(ClientBase):
    id: int
    user_id: int
    created_at: str

    class Config:
        orm_mode = True