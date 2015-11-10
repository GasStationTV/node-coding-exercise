"use strict";

const Mongorito = require('mongorito');
const api = require('roo')();
const schema = require('./schema');

class Station extends Mongorito.Model {
  configure () {
    this.before('create', 'validate');
    this.before('update', 'validate');
  }
  * validate (next) {
    // schema()
    yield next;
  }
}


api.get('/station', function *(){
  yield this.body = Station.all();
});

api.post('/station', function *(){
  var station = new Station(this.request.body);
  yield this.body = station.save();
});

api.put('/station/:id', function *(){
  yield this.body = Station.update({ '_id': this.request.params.id }, this.request.body);
});

// TODO: add yield to .connect call
Mongorito.connect('localhost/gstv');

module.exports = api;
