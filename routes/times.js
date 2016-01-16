﻿"use strict";
var dbMod = require("../db3")
    , db = new dbMod()
    , ObjectId = require('mongodb').ObjectID
    , times_model = require("../models/time")
    , validate = require("validate.js")
    , Q = require('q');

var timesRoute = (function () {
    function timesRoute() {

        let validation_constraints = {

            value_start: {
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0,
                    lessThanOrEqualTo: 288,
                    //even: true,
                    message: "Unable to Create/Update: time slot, end value does not match the expected format."
                }
            }
            , value_end: {
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0,
                    lessThanOrEqualTo: 349,
                    //even: true,
                    message: "Unable to Create/Update: time slot, start value does not match the expected format."
                }
            }
            , time_start: {
                numericality: {
                    greaterThan: 0,
                    lessThanOrEqualTo: 61,
                    //even: true,
                    message: "Unable to Create/Update: time slot, start time does not match the expected format."
                }
            }
            , time_end: {
                numericality: {
                    //onlyInteger: true,
                    greaterThan: 0,
                    lessThanOrEqualTo: 61,
                    //even: true,
                    message: "Unable to Create/Update: time slot, end time does not match the expected format."
                }
            }
            , day: {
                numericality: {
                    //onlyInteger: true,
                    greaterThan: 0,
                    lessThanOrEqualTo: 7,
                    //even: true,
                    message: "Unable to Create/Update: time slot, day does not match the expected format."
                }
            }
            , is_24: {
                inclusion: {
                    within: [true, false],
                    message: "Unable to Create/Update: time slot, is_24 does not match the expected format."
                }
            }
            , owner_id: {
                numericality: {
                    //onlyInteger: true,
                    greaterThan: 0,
                    lessThanOrEqualTo: 1000000,
                    //even: true,
                    message: "Unable to Create/Update: time slot, owner_id does not match the expected format."
                }
            }
            , deleted: {
                inclusion: {
                    within: [true, false, null],
                    message: "Unable to Create/Update: time slot, deleted does not match the expected format."
                }
            }
            , _id: {
                length: {
                    maximum: 100,
                    message: "Unable to Create/Update: time slot, message does not match the expected format."
                }
            }
        };


        let equal = (x, y) => {
            if (x === y) return true;
            // if both x and y are null or undefined and exactly the same

            if (!( x instanceof Object ) || !( y instanceof Object )) return false;
            // if they are not strictly equal, they both need to be Objects

            if (x.constructor !== y.constructor) return false;
            // they must have the exact same prototype chain, the closest we can do is
            // test there constructor.

            for (var p in x) {
                if (!x.hasOwnProperty(p)) continue;
                // other properties were tested using x.constructor === y.constructor

                if (!y.hasOwnProperty(p)) return false;
                // allows to compare x[ p ] and y[ p ] when set to undefined

                if (x[p] === y[p]) continue;
                // if they have the same strict value or identity then they are equal

                if (typeof( x[p] ) !== "object") return false;
                // Numbers, Strings, Functions, Booleans must be strictly equal

                if (!Object.equals(x[p], y[p])) return false;
                // Objects and Arrays must be tested recursively
            }

            for (p in y) {
                if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
                // allows x[ p ] to be set to undefined
            }
            return true;
        }
        this.checkTime = function (time) {
            //validate times
            let message, time_start = parseInt(time.time_start), time_end = parseInt(time.time_end);
            console.log(time_start);
            console.log(time_end);
            console.log(time);
            function getTime(query) {
                return qGetTime(query).then(function (times) {
                    if (times.data.length) {
                        if (times.data.length === 1 && times.data[0]._id.toString() === time._id) {
                            times.data[0]._id = times.data[0]._id.toString();
                            // got the current record
                            // check if current record is the same
                            console.log(times.data[0]);
                            var time_test = new times_model.time(times.data[0].value_start, times.data[0].value_end, times.data[0].day,
                                times.data[0].time_start, times.data[0].time_end, times.data[0].is_24, times.data[0].owner_id,
                                times.data[0].deleted, times.data[0]._id);
                            if (equal(time, time_test)) {
                                return {error: 'Unable to Create/Update: the time slot has not been changed'};
                            } else {
                                return true;
                            }
                        } else {
                            return {error: 'Unable to Create/Update: there is at least one overlapping time slot'};
                        }
                    } else {
                        return true;
                    }
                });
            }
            message = validate(time, validation_constraints);

            if (!time.is_24) {
                if (time_start >= time_end) {
                    message += 'Unable to Create/Update: The start time must be before the end time. '
                }
            }
            if (message) {
                console.log(message);
                return {error: message}
            }

            try {
                var qGetTime = Q.nbind(db.process_query, db);

                var query2 = {
                    object: {
                        owner_id: time.owner_id, deleted: {$ne: true}
                        , $or: [{$or: [{value_start: {$gte: time.value_start, $lt: time.value_end }}, {value_end: {$gt: time.value_start, $lte: time.value_end}}]}
                            , {$and: [{value_start: {$lte: time.value_start}}, {value_end: {$gte: time.value_start}}]}
                            , {_id: {$eq: ObjectId(time._id)}}]
                    },
                    verb: 'get',
                    collection: 'times'
                };
                var query = {
                    object: {
                        owner_id: time.owner_id, deleted: {$ne: true}
                        , $or: [{$or: [{value_start: {$gte: time.value_start, $lt: time.value_end }}, {value_end: {$gt: time.value_start, $lte: time.value_end}}]}
                            , {$and: [{value_start: {$lte: time.value_start}}, {value_end: {$gt: time.value_start}}]}
                            , {_id: {$eq: ObjectId(time._id)}}]
                    },
                    verb: 'get',
                    collection: 'times'
                };
                return getTime(query);
            } catch (e) {
                return ({error: e.message});
            }

        };


        this.update_create = function *(time, verb) {
            const myTime = new times_model.time(time.value_start, time.value_end, time.day, time.time_start, time.time_end, time.is_24, time.owner_id, time.deleted, time._id),
                isTimeOk = yield this.checkTime(myTime),
                qTimeUpdate = Q.nbind(db.process_query, db),
                query = {
                    collection: 'times',
                    verb: verb,
                    object: myTime
                };
            function timesUpdate(query) {
                return qTimeUpdate(query).then(function (result) {
                    return ({message: "Time updated/created successful."});
                });
            }

            if (isTimeOk != true) {
                return ({error: isTimeOk});
            }

            return timesUpdate(query);
        };
        this.get = function (query_object) {
            function getTime(query) {
                return qGetTime(query).then(function (times) {
                    return {times: times.data};
                });
            }

            try {
                var qGetTime = Q.nbind(db.process_query, db);
                var query = {
                    object: query_object,
                    verb: 'get',
                    collection: 'times'
                };
                return getTime(query);
            } catch (e) {
                return ({error: e.message});
            }
        };
        this.delete = function (query_object) {
            function getTime(query) {
                return qGetTime(query).then(function (times) {
                    return {times: times.data};
                });
            }

            try {
                var qGetTime = Q.nbind(db.process_query, db);
                var query = {
                    object: query_object,
                    verb: 'get',
                    collection: 'times'
                };
                return getTime(query);
            } catch (e) {
                return ({error: e.message});
            }
        };

    }

    return timesRoute;
})();

module.exports = timesRoute;
