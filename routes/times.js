"use strict";
var dbMod = require("../db3")
    , db = new dbMod()
    , ObjectId = require('mongodb').ObjectID
    , times_model = require("../models/time")
    , validate = require("validate.js")
    , Q = require('q');

var timesRoute = (function () {
    function timesRoute() {



        let validation_constraints = {
            creditCardNumber: {
                presence: true,
                format: {
                    pattern: /^(34|37|4|5[1-5]).*$/,
                    message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                        return validate.format("^%{num} is not a valid credit card number", {
                            num: value
                        });
                    }
                },
                length: function(value, attributes, attributeName, options, constraints) {
                    if (value) {
                        // Amex
                        if ((/^(34|37).*$/).test(value)) return {is: 15};
                        // Visa, Mastercard
                        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
                    }
                    // Unknown card, don't validate length
                    return false;
                }
            },
            creditCardZip: function(value, attributes, attributeName, options, constraints) {
                if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
                return {
                    presence: {message: "is required when using AMEX"},
                    length: {is: 5}
                };
            }
        }




        let equal = ( x, y ) => {
            if ( x === y ) return true;
            // if both x and y are null or undefined and exactly the same

            if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
            // if they are not strictly equal, they both need to be Objects

            if ( x.constructor !== y.constructor ) return false;
            // they must have the exact same prototype chain, the closest we can do is
            // test there constructor.

            for ( var p in x ) {
                if ( ! x.hasOwnProperty( p ) ) continue;
                // other properties were tested using x.constructor === y.constructor

                if ( ! y.hasOwnProperty( p ) ) return false;
                // allows to compare x[ p ] and y[ p ] when set to undefined

                if ( x[ p ] === y[ p ] ) continue;
                // if they have the same strict value or identity then they are equal

                if ( typeof( x[ p ] ) !== "object" ) return false;
                // Numbers, Strings, Functions, Booleans must be strictly equal

                if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
                // Objects and Arrays must be tested recursively
            }

            for ( p in y ) {
                if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
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
                    //console.log(time)
                    //console.log('aaaaaaaaaaaaaaaaaaaaaa-----check----------aaaaaaaaaaaaa')
                    console.log(times);
                    if (times.data.length) {
                        console.log('aaaaaaaaaaaaaaaaaaaaaa-----check----------aaaaaaaaaaaaa')
                        //console.log(time);
                        if(times.data.length === 1 && times.data[0]._id.toString() === time._id){
                            times.data[0]._id = times.data[0]._id.toString();
                            // got the current record
                            // check if current record is the same
                            console.log('aaaaaaaaaaaaaaaaaaaaaa-----check----------aaaaaaaaaaaaa')
                            console.log(time);
                            console.log(times.data[0]);
                            var time_test = new times_model.time(times.data[0].value_start, times.data[0].value_end, times.data[0].day,
                                times.data[0].time_start, times.data[0].time_end, times.data[0].is_24, times.data[0].owner_id,
                                times.data[0].deleted, times.data[0]._id);
                            //time_test = times.data[0];
                            if(equal(time, time_test)){
                                return {error: 'Unable to Create/Update: the time slot has not been changed'};
                            }else{
                                return true;
                            }
                        }else{
                            return {error: 'Unable to Create/Update: there is at least one overlapping time slot'};
                        }
                        //return 'Unable to Create/Update: there is at least one overlapping time slot';
                    } else {
                        return true;
                    }
                });
            }
            if(!time.is_24){
                if (time_start >= time_end) {
                    message = 'Unable to Create/Update: The start time must be before the end time. '
                }
                if (time_start < 0 || time_start > 61) {
                    message += 'Unable to Create/Update: time slot, start time does not match the expected format. '
                }
                if (time_end < 0 || time_end > 61) {
                    console.log('test')
                    message += 'Unable to Create/Update: time slot, end time does not match the expected format. '
                }
                if (message) {
                    return {error: message}
                }
            }

            try {
                var qGetTime = Q.nbind(db.process_query, db);

                var query = {
                    object: {
                        owner_id: time.owner_id, deleted: {$ne: true}//,_id: {$ne: ObjectId(time._id)}
                        , $or: [{value_start: {$lt: time.value_end, $gt: time.value_start}}, {value_end: {$gt: time.value_end, $lt: time.value_start}}
                            , {_id: {$eq: ObjectId(time._id)}}]
                    },
                    verb: 'get',
                    collection: 'times'
                };
                //console.log(time.value_start)
                //console.log('aaaaaaaaaaaaaaaaaaaaaa-----check----------aaaaaaaaaaaaa')
                //console.log(query.object)
                return getTime(query);
            } catch (e) {
                //console.log("test2");
                return ({error: e.message});
            }

        };


        this.update_create = function *(time, verb) {
            //console.log('asdfasdf');
            const myTime = new times_model.time(time.value_start, time.value_end, time.day, time.time_start, time.time_end, time.is_24, time.owner_id, time.deleted, time._id),
                isTimeOk = yield this.checkTime(myTime),
                qTimeUpdate = Q.nbind(db.process_query, db),
                query = {
                    collection: 'times',
                    verb: verb,
                    object: myTime
                };
            //console.log(query);
            function timesUpdate(query) {
                return qTimeUpdate(query).then(function (result) {
                    //console.log('inside q promise')
                    return ({message: "Time updated/created successful."});
                });
            }

            ////console.log(myTime);
            if (isTimeOk != true) {
                //console.log(isTimeOk);
                return ({error: isTimeOk});
            }

            return timesUpdate(query);
        };
        this.get = function (query_object) {
            function getTime(query) {
                return qGetTime(query).then(function (times) {
                    //console.log('inside promise')
                    //console.log(times);
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
                //console.log("test2");
                return ({error: e.message});
            }
        };
        this.delete = function (query_object) {
            function getTime(query) {
                return qGetTime(query).then(function (times) {
                    //console.log('inside promise')
                    //console.log(times);
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
                //console.log("test2");
                return ({error: e.message});
            }
        };
        //this.get_by_owner_or_id = function (koaThis, is_owner) {
        //    try  {
        //        var qGetTime = Q.nbind(db.process_db_query, db);
        //        var query = {
        //            object: is_owner ? { owner_id: koaThis.request.query._id, deleted: { $ne: false } } : { _id: koaThis.request.query._id, deleted: { $ne: false } },
        //            verb: 'get',
        //            collection: 'times'
        //        };
        //        function getTime(query) {
        //            return qGetTime(query).then(function (times) {
        //                //console.log(times);
        //                return { times: times };
        //            });
        //        }
        //        return getTime(query);
        //    } catch (e) {
        //        //console.log("test2");
        //        return ({ error: e.message });
        //    }
        //};

    }

    return timesRoute;
})();

module.exports = timesRoute;
