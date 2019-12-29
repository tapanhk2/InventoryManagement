/**
 * Module Dependencies
 */

//var env = require('dotenv').load()
var express = require('express')
var cors = require('cors')
var path = require('path')
var helmet = require('helmet')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mysql = require('mysql');
var env = require('dotenv').config({path: path.join(__dirname, '.env')})

var fs = require('fs');
var util = require('util');
var config = require('./src/config/config')
// Importing Routes
var authRoute = require('./src/routes/auth');
var productRoute = require('./src/routes/product');

var app = express()
app.use(logger('dev'))
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
  parameterLimit: 50000
}))
app.use(cookieParser())
app.use(cors());
 

if (process.env.NODE_ENV === 'production') {
  // Turn on combined logging in production
  app.use(logger('combined'))
  // HTTPS Strict-Transport-Security
  app.use(helmet.hsts({
    maxAge: after.ten.months
  }))
}


//app.use(validator())

app.use('/api/v1/product', productRoute);
app.use('/api/v1/auth', authRoute);

// Security Settings
app.disable('x-powered-by') // Don't advertise our server type
app.use(helmet.ieNoOpen()) // X-Download-Options for IE8+
app.use(helmet.noSniff()) // Sets X-Content-Type-Options to nosniff
app.use(helmet.xssFilter()) // sets the X-XSS-Protection header
app.use(helmet.frameguard({
  action: 'deny'
})) // Prevent iframe clickjacking

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  //res.render('errors/404')
   next(err);
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  if (err.status === 500) {
    //res.render('errors/500')
  }
  if (err.status === 503) {
    //res.render('errors/503')
  } else {
    //res.render('errors/500')
  }
})
let port = 3000;
app.listen(port,function(){
    console.log('app listening on port: '+port);
});
    
module.exports = app
