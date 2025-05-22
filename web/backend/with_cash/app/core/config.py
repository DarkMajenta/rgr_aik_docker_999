from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_URL: str
    REDIS_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    STRIPE_SECRET_KEY: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()