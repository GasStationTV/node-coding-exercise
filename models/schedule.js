import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var scheduleSchema = new mongoose.Schema({
  site_id: String,
  days: {
    sunday: {
      isOpenAllDay: Boolean,
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    monday: {
      isOpenAllDay: Boolean,
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    tuesday: {
      isOpenAllDay: Boolean,
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    wednesday: {
      isOpenAllDay: Boolean,
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    thursday: {
      isOpenAllDay: Boolean,
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    friday: {
      isOpenAllDay: Boolean,
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    },
    saturday: {
      isOpenAllDay: Boolean,
      hours: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
    }
  }
})

var Schedules = mongoose.model('Schedules', scheduleSchema);

module.exports = Schedules;
