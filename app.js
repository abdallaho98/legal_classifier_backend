const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const legalRouter = require('./routes/legal')
const predictRouter = require('./routes/prediction')
const app = express();
const Mongoose = require('mongoose')
const url = process.env.MONGO_URI || "mongodb://localhost:27017/legal_classifier"
const port = process.env.PORT || 3000

Mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true }).then(res => {console.warn('connected')}).catch(err => {console.warn(err)});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/legal', legalRouter);
app.use('/predict', predictRouter);


app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});



module.exports = app;

