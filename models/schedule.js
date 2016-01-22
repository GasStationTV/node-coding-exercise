import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var scheduleSchema = new mongoose.Schema({
  site_id: { type: String, required: true},
  days: { 
    sunday: {
      isOpenAllDay: {type: Boolean, required: true, enum: [true, false]},
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    monday: {
      isOpenAllDay: {type: Boolean, required: true, enum: [true, false]},
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    tuesday: {
      isOpenAllDay: {type: Boolean, required: true, enum: [true, false]},
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    wednesday: {
      isOpenAllDay: {type: Boolean, required: true, enum: [true, false]},
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    thursday: {
      isOpenAllDay: {type: Boolean, required: true, enum: [true, false]},
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    friday: {
      isOpenAllDay: {type: Boolean, required: true, enum: [true, false]},
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    saturday: {
      isOpenAllDay: {type: Boolean, required: true, enum: [true, false]},
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    }
  }
})

var Schedules = mongoose.model('Schedules', scheduleSchema);

module.exports = Schedules;
