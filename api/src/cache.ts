import apicache from "apicache";
import redis from "redis";

const MAX_AGE = 60 * 60 * 24;

const cache = apicache.options({
  redisClient: redis.createClient(),
  headers: {
    "cache-control": `public, max-age=${MAX_AGE}`,
  },
}).middleware;

export default cache;
