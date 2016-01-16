"use strict";
let send = require('koa-send'),
    app = require('koa')(),
    path = require('path'),
    routesMod = require("./routes/routes"),
    routes = new routesMod(),
    router = require('koa-router')(),
    parse = require('co-body'),
    appPath = path.dirname(require.main.filename).replace(/\\/g,"/").replace('C', 'c') + '/public';

router
    .get('/index', function *(next) {
        yield send(this, '/index.html', { root: appPath, maxage: 10 * 24 * 60 * 60 });
    })
    .get('/times/:time_id', function *(next) {
        var response = yield routes.times.get({ _id: this.params.time_id, deleted: { $ne: false } });
        if(response.error){
            this.body = response.error;
        }else{
            this.body = response;
        }
    })
    .get('/owners/:owner_id/times/', function *(next) {
        var response = yield routes.times.get({ owner_id: this.params.owner_id, deleted: { $ne: true } });
        if(response.error){
            this.body = response.error;
        }else{
            this.body = response;
        }
    })
    .post('/owners/:owner_id/times', function *(next) {
        var time = yield parse.json(this, { limit: '1kb' });
        time.owner_id = this.params.owner_id;
        var response = yield routes.times.update_create(time, 'post');
        if(response.error){
            this.body = response.error;
        }else{
            this.body = response;
        }
    })
    .put('/times/:time_id', function *(next) {
        var time = yield parse.json(this, { limit: '1kb' });
        var response = yield routes.times.update_create(time, 'put');
        if(response.error){
            this.body = response.error;
        }else{
            this.body = response;
        }
    })
    .del('/times/:time_id', function *(next) {
        var time = yield parse.json(this, { limit: '1kb' });
        time.deleted = true;
        var response = yield routes.times.update_create(time, 'put');
        if(response.error){
            this.body = response.error;
        }else{
            this.body = response;
        }
    })
    .redirect('/', 'index');

app
    .use(router.routes())
    .use(router.allowedMethods());
app.use(function *(){
    yield send(this, this.path, { root: appPath, maxage: 10 * 24 * 60 * 60 });
})

app.listen(4567);
console.log('listening on port 4567');
