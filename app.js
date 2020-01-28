const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const legalRouter = require('./routes/legal')
const app = express();
const Mongoose = require('mongoose')
const url = "mongodb://localhost:27017/legal_classifier"
const port = process.env.PORT || 3000
const http = require('http')

Mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true}).then(res => {console.warn('connected')}).catch(err => {console.warn(err)});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/legal', legalRouter);

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});



module.exports = app;
