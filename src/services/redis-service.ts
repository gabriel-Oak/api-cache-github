import Redis, { Redis as RedisClient } from 'ioredis';

export class RedisService {
  redis: RedisClient;

  constructor(redis: RedisClient) {
    this.redis = redis;
  }

  async get(key: string) {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: object, expirationSeconds = 60 * 60) {
    return this.redis.set(key, JSON.stringify(value), 'EX', expirationSeconds);
  }

  async del(args: KeyType[]) {
    return this.redis.del(args);
  }

  async delPrefix(prefix: string) {
    let keys = await this.redis.keys(`cache:${prefix}`);
    keys = keys.map((key) => key.replace('cahce:', ''));

    return this.del(keys as unknown as KeyType[]);
  }
}

const redisService = new RedisService(new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS,
  keyPrefix: 'cache',
}));

export default redisService;