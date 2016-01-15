"use strict";

//var mongodb = require('mongodb'), ObjectId = require('mongodb').ObjectID, server = new mongodb.Server('localhost', 27017, {auto_reconnect: true}),
//    db = new mongodb.Db('gstv', server, {wtimeout: 2000});

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/gstv';
var db;
MongoClient.connect(url, function(err, my_db) {
    assert.equal(null, err);
    //console.log("Connected correctly to server.");
    //db.close();
    db = my_db;
});

var db_module = (function() {
    //var query = JSON.parse(query_string);
    function db_module() {
        this.process_query = function(query, callback) {
            db.collection(query.collection, function (error, objects) {
                if (error) {
                    console.error(error);
                    return;
                }
                if (query.object._id && typeof query.object._id != "object") {
                    query.object._id = new ObjectId(query.object._id);
                }
                if (query.object.foreignId && typeof query.object.foreignId != "object") {
                    query.object.foreignId = new ObjectId(query.object.foreignId);
                }
                if (query.verb == "post") {
                    objects.save(query.object, {safe: true}, function (error, result) {
                        if (error) {
                            //console.log(error);
                        }
                        ////console.log("result");
                        ////console.log(result);
                        var data = result, response = {data: data};
                        //observer.onNext(response);
                        callback(null, response);
                    });
                }
                else if (query.verb == "get") {
                    //console.log(query.verb);
                    objects.find(query.object, function (error, result) {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        result.toArray(function (error, results) {
                            //console.log(results);
                            var data = results, response = {data: data};
                            //return response;
                            //callback.resolve({ times: response });
                            callback(null, response);
                        });
                    });
                }
                else if (query.verb == "put") {
                    //console.log(query.verb);
                    objects.save(query.object, {safe: true}, function (error, result) {
                        if (error) {
                            console.error(error);
                        }
                        ////console.log("result");
                        ////console.log(result);
                        var data = result, response = {data: data};
                        //return response;
                        callback(null, response);
                    });
                }
            });
        }
    }

    return db_module;
})();

module.exports = db_module;