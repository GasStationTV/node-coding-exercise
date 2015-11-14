const app = require('koa')();
const api = require('./api');

var production = process.env.NODE_ENV === 'production';


if(!production){
  // Scan `/dist` for live updates and pass `refresh` on fileupdate
  const WebSocketServer = require('ws').Server;
  const fs = require('fs');
  var wss = new WebSocketServer({ port: 8081 });
  wss.on('connection', function(ws){

  });
  wss.broadcast = function(data) {
    for(var i in this.clients){
      if(!this.clients[i]._closeReceived){
        this.clients[i].send(data);
      }
    }
  }
  fs.watch('./dist', function(e, filename){
    var filetype = filename.substr(filename.lastIndexOf('.') + 1)
    if (filetype === 'js' || filetype === 'css' || filetype === 'html'){
      wss.broadcast('refresh');
    }
  });
}

app.use(require('koa-mount')('/api', api));
app.use(require('koa-static')('dist'));

app.listen(process.env.PORT || 8080)
