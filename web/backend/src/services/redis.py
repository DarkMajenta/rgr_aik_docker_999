import redis
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
redis_client = redis.Redis.from_url(REDIS_URL)

def cache_data(key: str, value: str, expire: int = 3600):
    redis_client.setex(key, expire, value)

def get_cached_data(key: str):
    return redis_client.get(key)