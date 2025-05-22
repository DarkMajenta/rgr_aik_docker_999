from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_URL: str
    REDIS_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()