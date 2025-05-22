# web/backend/src/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import auth, orders, dishes, restaurants, admin
from src.config.database import engine
from src.models import Base

app = FastAPI(title="Restaurant Delivery API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "https://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(dishes.router, prefix="/api/dishes", tags=["dishes"])
app.include_router(restaurants.router, prefix="/api/restaurants", tags=["restaurants"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}