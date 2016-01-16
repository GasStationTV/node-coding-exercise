"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/gstv';
var db;
MongoClient.connect(url, function(err, my_db) {
    assert.equal(null, err);
    db = my_db;
});

var db_module = (function() {
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
                            console.log(error);
                        }
                        var data = result, response = {data: data};
                        callback(null, response);
                    });
                }
                else if (query.verb == "get") {
                    objects.find(query.object, function (error, result) {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        result.toArray(function (error, results) {
                            var data = results, response = {data: data};
                            callback(null, response);
                        });
                    });
                }
                else if (query.verb == "put") {
                    objects.save(query.object, {safe: true}, function (error, result) {
                        if (error) {
                            console.error(error);
                        }
                        var data = result, response = {data: data};
                        callback(null, response);
                    });
                }
            });
        }
    }

    return db_module;
})();

module.exports = db_module;