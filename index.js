//Calling and configuration of the required modules for express, morgan, cookie-parser, and method-override
const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const methodOverride = require("method-override");
app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

//Setting the path for style modules
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//Setting the path for the different view pages
app.set('view engine', 'ejs');
app.set('views', 'views');

//Establishing router
const cohortRouter = require('./routes/cohortRouter');
app.use('/cohorts', cohortRouter);

//Base GET method for getting the home page
app.get('/', (request, response) => {
    response.render('home_page');
})

//Establishing a listener connection to localhost:3000, where the site is hosted
const PORT = 3000;
const DOMAIN = "localhost" //loopback address: 127.0.0.1
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})