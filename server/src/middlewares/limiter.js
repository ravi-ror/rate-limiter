const redis = require('redis');
const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { endpointUri, password } = require('../config').redis;
const redisClient = redis.createClient(`redis://${endpointUri}`, { password });

// config for 5 update requests per 24 hours
const limiter = RateLimit({
    store: new RedisStore({
        client: redisClient,
        expiry: 24*60*60*1000 //removes key in secods from redis
    }),
    max: 5, // maximum count of request in given duration windowMs here
    windowMs: 24*60*60*1000, // duration for rate limit  ... 5 requests in 10 seconds    << 15*60*1000, // 15 minutes >>
    keyGenerator: (request /*, response*/) => request.user.user_external_id,  // key in redis.. we are using user external id, default is IP,
    message: 'Too many requests',
    //statusCode: 400 // in case of limit threashold deafult status is 429, we can send custom status code here
});

// after limit threshold sends a 429 response

module.exports = { limiter };
