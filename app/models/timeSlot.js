'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TimeSlotSchema = new Schema({
  siteId: Number,
  dateTime: Number,
  openTimes: Array,
  closeTimes: Array,
  timeSlotCount: Number,
  isTwentFourHours: Boolean
});

mongoose.model('TimeSlot', TimeSlotSchema);

