const api = require('koa')();

const router = require('koa-router')();
const schema = require('./schema');
const mongoose = require('mongoose');

api.use(require('koa-bodyparser')());

const Station = mongoose.model('stations', schema);

router.get('/station', function *(){
  yield this.body = Station.all();
});

router.post('/station', function *(){
  var station = new Station(this.request.body)
  yield station.save();
  this.body = station;
});
router.put('/station/:id', function *(){
  var station = new Station(this.request.body);
  yield station.save();
  this.body = station;
});

api.use(router.routes());
mongoose.connect('localhost/gstvnode');

module.exports = api;
