'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = Token => {
  Token.generateToken = (req, appId, next) => {
    let app = Token.app.models.app;

    app.findById(appId, (err, app) => {
      if (err || !app || !app.userId) {
        return next('Application does not exist');
      }

      jwt.sign({userId: app.userId, appId}, jwtSecret, {expiresIn: 31536000}, (err, token) => {
        next(err, token);
      });
    });
  };

  Token.remoteMethod('generateToken', {
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'appId', type: 'string', required: true}
    ],
    isStatic: true,
    returns: {arg: 'token', type: 'string'},
    http: {path: '/', verb: 'post'}
  });
};
