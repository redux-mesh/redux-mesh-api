'use strict';

const jwt = require('express-jwt');
const jwtSecret = process.env.JWT_SECRET;

module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();

  // JWT Configuration
  server.use('/api/events', jwt({secret: jwtSecret}));
};
