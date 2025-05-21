const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL,
});
client.connect().catch(console.error);

const cache = async (key, ttl, fetchData) => {
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchData();
  await client.setEx(key, ttl, JSON.stringify(data));
  return data;
};

module.exports = { redisClient: client, cache };