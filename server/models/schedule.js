import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// validate opened_at and closed_at are military time
const militaryTime = /^([01]\d|2[0-3]):([03]0)$/;

// validate iso dow running from 1 for Monday to 7 for Sunday
let Schedule = new Schema({
  dow: {
        type: 'Number',
        required: true,
        min : 1,
        max : 7
       },
  opened_at: { type: 'String', match: militaryTime},
  closed_at: { type: 'String', match: militaryTime},
  closed_next_day: { type: 'Boolean'},
  is_24: { type: 'Boolean'},
});

Schedule.pre('validate', function(next) {

  // assumption: validate opened_at, closed_at, and is_24 may not all be set
  if(this.opened_at && this.closed_at && this.is_24) {
    this.invalidate("opened_at", "opened_at, closed_at, and is_24 must not be set in conjunction");
    this.invalidate("closed_at", "opened_at, closed_at, and is_24 must not be set in conjunction");
    this.invalidate("is_24", "opened_at, closed_at, and is_24 must not be set in conjunction");
  }

  // If a start time is entered a close time is required
  if(this.opened_at && !this.closed_at) {
    this.invalidate("opened_at", "If opened_at is set then closed_at must be");
    this.invalidate("closed_at", "If opened_at is set then closed_at must be");
  }

  // If a close time is entered a start time is required
  if(!this.opened_at && this.closed_at) {
    this.invalidate("opened_at", "If closed_at is set then opened_at must be");
    this.invalidate("closed_at", "If closed_at is set then opened_at must be");
  }

  // If the start time falls on the end time
  if((this.opened_at && this.closed_at) && (this.opened_at === this.closed_at)) {
    this.invalidate("opened_at", "opened_at and closed_at must not be the same value");
    this.invalidate("closed_at", "opened_at and closed_at must not be the same value");
  }

  return next();
});

// @TODO - validations
// validate opened_at between Midnight and end 11:30 PM (these are confusing)
// validate closed_at between 12:30 AM and end at 6:00 AM (next day) (these are confusing)

// If the start time falls after the end time
// If the end time falls before the start time

export default mongoose.model('Schedule', Schedule);

