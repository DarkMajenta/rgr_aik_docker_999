from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, dishes, orders, admin

app = FastAPI(title="Food Delivery API")

# CORS configuration for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(dishes.router, prefix="/menu", tags=["menu"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}