from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import require_role
from app.models.dish import Dish
from app.models.user import User
from app.schemas.dish import DishCreate, Dish
from app.schemas.user import User

router = APIRouter()

@router.post("/dishes", response_model=Dish)
async def create_dish(dish: DishCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    db_dish = Dish(**dish.dict())
    db.add(db_dish)
    db.commit()
    db.refresh(db_dish)
    return db_dish

@router.put("/dishes/{id}", response_model=Dish)
async def update_dish(id: int, dish: DishCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    db_dish = db.query(Dish).filter(Dish.id == id).first()
    if not db_dish:
        raise HTTPException(status_code=404, detail="Dish not found")
    for key, value in dish.dict().items():
        setattr(db_dish, key, value)
    db.commit()
    db.refresh(db_dish)
    return db_dish

@router.delete("/dishes/{id}")
async def delete_dish(id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    db_dish = db.query(Dish).filter(Dish.id == id).first()
    if not db_dish:
        raise HTTPException(status_code=404, detail="Dish not found")
    db.delete(db_dish)
    db.commit()
    return {"message": "Dish deleted"}

@router.get("/users", response_model=list[User])
async def get_users(db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    return db.query(User).all()

@router.put("/users/{id}/role", response_model=User)
async def update_user_role(id: int, role: str, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    if role not in ["guest", "client", "admin"]:
        raise HTTPException(status_code=400, detail="Invalid role")
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role
    db.commit()
    db.refresh(user)
    return user