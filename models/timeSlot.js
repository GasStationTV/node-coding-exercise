import mongoose from 'mongoose';

var timeSlotSchema = new mongoose.Schema({
  schedule_id: {type: String, required: true},
  open: {type: String, required: true},
  close: {type: String, required: true},
})

var TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
