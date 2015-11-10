const app = require('roo')();
const api = require('./lib/api');
const extname = require("path").extname;

// Logging
app.logger(function(ctx) {
  return extname(ctx.url) ? false : true;
});
app.app.on('error', function(err) {
  console.log(err.stack);
});
process.on('uncaughtException', function(err) {
  console.log(err);
});

// soon to be replaced by webpack
app.bundle(require('./lib/bundler.js'));

app.bundle('index.{js,css}');

app.mount('/api', api);

app.get('/', 'index.jade');

module.exports = app;
