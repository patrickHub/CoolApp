

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var cors = require('cors-express');
// var bodyParser = require('body-parser');
var app = express();
// use it before all route definitions
app.use(cors({
  origin: '*',
  exposedHeaders: ['Content-Type', 'Location']
}));
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var realtime = require('./app/realtime/realtime.js');
realtime.setup(io);
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

module.exports = require('./config/express')(app, config);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

