import createError = require('http-errors');
import express = require('express');
import lib = require('./controller');

const app = express();

// Routing
app.get('/', (req, res) => res.json(lib.getStats()));
app.get('/update', async (req, res) => res.json(await lib.updateStats()));

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
