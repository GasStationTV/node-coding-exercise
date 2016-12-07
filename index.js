const page = require('page');
const riot = require('riot');
const compiler = require('riot-compiler')
const request = require('superagent');
const schema = require('./lib/schema');

var stations = [];


function welcome(){
  riot.mount('station', stations);
};

function load(ctx, next){
  // TODO: superagent syntax breaks coding-standards (superagen-promise?)
  request.get('/api/station').end(function(err, res){
    stations = res.body;
    next();
  })
};

page('/', load, welcome);
page();
