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

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const cohortRouter = require('./routes/cohortRouter');
app.use('/cohorts', cohortRouter);

app.get('/', (request, response) => {
    response.render('home_page');
})

const PORT = 3000;
const DOMAIN = "localhost" //loopback address: 127.0.0.1
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})