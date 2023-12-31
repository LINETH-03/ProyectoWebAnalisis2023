var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var informeRouter = require('./routes/informe');
var ingresoRouter = require('./routes/ingreso');
var retirosRouter = require('./routes/retiros');
var AuthRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set("view engine", "ejs")
var corsOptions = {
  origin: process.env.FRONTEND_DOMAIN,
  credentials: true
}
//Middlewares.
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/', usersRouter);
app.use('/users', usersRouter);
app.use('/informe', informeRouter);
app.use('/ingreso', ingresoRouter);
app.use('/retiros', retirosRouter);
app.use('/auth', AuthRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;