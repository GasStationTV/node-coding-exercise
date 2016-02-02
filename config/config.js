var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'node-coding-exercise'
    },
    port: 3000,
    db: 'mongodb://localhost/gstvDev'
  },

  test: {
    root: rootPath,
    app: {
      name: 'node-coding-exercise'
    },
    port: 3000,
    db: 'mongodb://localhost/gstvTest'
  },

  production: {
    root: rootPath,
    app: {
      name: 'node-coding-exercise'
    },
    port: 3000,
    db: 'mongodb://localhost/gstvProd'
  }
};

module.exports = config[env];
