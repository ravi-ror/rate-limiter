const express = require('express');
const path = require('path');
const { limiter } = require('./src/middlewares/limiter');

const { port } = require('./src/config').app;

const app = express();

app.use('/', express.static(path.join(__dirname, './src/public')));

app.get('/api/ping', limiter, (req, res) => {
    return res.send('PONG');
});

// setting user external id in request for rate limiter key
app.use(function(req, res, next) {
    req.user = { user_external_id:'USR-123' }
    next()
})

app.get('/ping-long', limiter, (req, res) => {
    return res.send('PONG');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
