import mongoose from 'mongoose'

mongoose.connect("mongodb://" + process.env.MONGOLAB_URI);

module.exports.Sites = require('./site.js');
module.exports.Schedules = require('./schedule.js');
module.exports.TimeSlot = require('./timeSlot.js');
