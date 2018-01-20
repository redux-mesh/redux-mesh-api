'use strict';

let mongoDbUrl = process.env.MONGODB_URL;

module.exports = {
  db: {
    connector: 'mongodb',
    url: mongoDbUrl
  }
};
