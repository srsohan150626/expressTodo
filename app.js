//Basic Lib import
const express = require('express');
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require('body-parser');

//Security Middleware Lib import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database Lib import
const mongoose = require('mongoose');

//Security Middleware implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//body parser implement
app.use(bodyParser.json())

//Request Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 miniutes
    max: 100 //limit each ip to 100 request per window
})
app.use(limiter)

//Database Connection
let URI = "mongodb://127.0.0.1:27017/todo";
let options = {user: '', pass: '', autoIndex: true};
mongoose.connect(URI, options, (error) => {
    console.log("Database Connected!");
    if (error) {
        console.log(error);
    }

})

app.use("/api/v1", router);

//undefined route
app.use('*', (req, res) => {
    res.status(404).json({success: 'failed', message: 'Undefined route!'});
})
module.exports = app;