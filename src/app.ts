import createError = require('http-errors');
import express = require('express');
import lib = require('./controller');
import cors = require('cors');

require('dotenv').config();

const app = express();

// use cors
app.use(
  cors({
    origin: `${
      app.get('env') === 'development' ? '*' : process.env.FRONT_END_URL
    }`,
  }),
);

// Routing
app.get('/', async (req, res) => res.json(await lib.updateStats()));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
