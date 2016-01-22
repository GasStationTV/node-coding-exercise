import mongoose from 'mongoose';

var timeSlotSchema = new mongoose.Schema({
  schedule_id: String,
  open: String,
  close: String
})

var TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
