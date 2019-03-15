var createError = require('http-errors');
var express = require('express');
var path = require('path');
let hbs = require('hbs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let exphbs = require('express-handlebars');
let expressSession = require('express-session');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

// local module
var indexRouter = require('./routes/index');
let homeRouter  = require('./routes/home');
let register = require('./routes/register');
let keys = require('./config/keys');
const loginRouter = require('./routes/login');
const paymentRouter = require('./routes/payment');
const historyRouter = require('./routes/history');
const requesRouter = require('./routes/request');
const profileRouter = require('./routes/profile');

var app = express();



app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
  


// setting handlebars partials
hbs.registerPartials(__dirname + '/views/partials');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser());
app.use(bodyParser.json());
app.use(expressValidator());
// express session at work
app.use(expressSession({secret : 'idejdjsjdskfdjddjdkk', saveUninitialized : true, resave: true}));

app.use('/',  indexRouter);
app.use('/home',ensureAuthenticated, homeRouter);
app.use('/register', register);
app.use('/login', loginRouter);
app.use('/payment',ensureAuthenticated, paymentRouter);
app.use('/history',ensureAuthenticated, historyRouter);
app.use('/request',ensureAuthenticated, requesRouter);
app.use('/profile',ensureAuthenticated, profileRouter);

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


// render 404 error
// app.use('*', function(req, res) {
//   res.sendFile(path.join(__dirname + 'test.html'));

// });

// ensure authentication...
function ensureAuthenticated(req, res, next){
  if( req.session.user || req.user){
    return next();
  }else{
    console.log('message :   you are not logged in ...');
    res.redirect('/login');
  }
  }

module.exports = app;
