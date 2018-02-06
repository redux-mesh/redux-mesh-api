'use strict';

let loopback = require('loopback');
let boot = require('loopback-boot');
let session = require('express-session');

let app = module.exports = loopback();

const cookieSecret = process.env.COOKIE_SECRET;

app.use(session({
  secret: cookieSecret,
  resave: false,
  saveUninitialized: true
}));

app.start = () => {
  return app.listen(() => {
    app.emit('started');
    let baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      let explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, (err) => {
  if (err) throw err;

  if (require.main === module)
    app.start();
});
