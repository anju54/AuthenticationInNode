const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
let middleware = require('./middleware/middleware');

const config = require('./util/config');
const feedRoutes = require('./routes/user');
const con = require('./util/database');

const app = express();

app.use(bodyParser.json()); // application/json

app.use('/user', feedRoutes);

app.listen(8085);
console.log("At end");