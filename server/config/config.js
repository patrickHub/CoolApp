var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'secure-rest-api-with-automated-tests'
    },
    port: process.env.PORT || 3030,
    db: 'mongodb://localhost:27017/project-final-tests-development',
    socketIoUrl: 'http://localhost:3030',
    jwtsecret: process.env.JWTSECRET || 'supersecretsharedkey'
  },

  test: {
    root: rootPath,
    app: {
      name: 'secure-rest-api-with-automated-tests'
    },
    port: process.env.PORT || 3030,
    db: 'mongodb://localhost:27017/project-final-test',
    jwtsecret: process.env.JWTSECRET || 'supersecretsharedkey'
  },

  production: {
    root: rootPath,
    app: {
      name: 'secure-rest-api-with-automated-tests'
    },
    port: process.env.PORT || 3030,
    db: 'mongodb://localhost:21017/project-final-production',
    jwtsecret: process.env.JWTSECRET || 'supersecretsharedkey'
  }
};

module.exports = config[env];
