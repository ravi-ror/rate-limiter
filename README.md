# Tutorial: Rate Limiting app in NodeJS 

## Technical Stack

- Backend - NodeJS, ExpressJS, Redis

## How it works

This app has been build using `express-rate-limit` and `rate-limit-redis` library which will block connections from a client after surpassing certain amount of requests (5 request in 24 hours and redis key will be removed in 24 hours)

On the 10th run server should return an HTTP status code of **429 Too Many Requests**


## Hot to run it locally?
just run command: npm run dev and got to root url. After 5 time reload the request will send message 'too many request' with status code 429
Make sure you redis server is start
# install dependencies
npm install

```

### Env variables:

-   PORT - port that server is listening on.
-   REDIS_HOST - host for redis instance. Can be with `redis://` or without.
-   REDIS_PORT - port for redis instance.
-   REDIS_PASSWORD - password for redis. Running redis by docker-compose, there's no password. Running by https://redislabs.com/try-free/ you have to pass this variable.
-   REDIS_ENDPOINT_URI - redis port and host encoded in redis uri take precedence over other environment variables. Can be with `redis://` or without.


## Deployment

To make deploys work, you need to create free account in https://redislabs.com/try-free/ and get Redis' instance informations - REDIS_ENDPOINT_URI and REDIS_PASSWORD. You must pass them as environmental variables (in .env file or by server config, like `Heroku Config Variables`).
