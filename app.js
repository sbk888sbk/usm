const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
const cors = require('cors')

const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

//ROUTES
app.use('/', viewRouter)
app.use('/api/users', userRouter)

//ALL Other routes
app.all('*', (req, res, next) => {
    res.status(404).send({
        status:404,
        message:`Can't find ${req.originalUrl} on this server!`
    });
  });


module.exports = app;