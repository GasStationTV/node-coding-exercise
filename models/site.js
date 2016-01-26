import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var siteSchema = new Schema({
  name: String,
  street: String,
  city: String,
  state: String,
  timezone: String,
  phone: String,
  email: String,
  primaryContactName: String,
  otherContacts: [String],
  lastUpdated: {type: Date, default: Date.now},
  observedHolidays: [String],
  schedule: {
    sunday: {
      isOpenAllDay: Boolean,
      hours: Array
    },
    monday: {
      isOpenAllDay: Boolean,
      hours: Array
    },
    tuesday: {
      isOpenAllDay: Boolean,
      hours: Array
    },
    wednesday: {
      isOpenAllDay: Boolean,
      hours: Array
    },
    thursday: {
      isOpenAllDay: Boolean,
      hours: Array
    },
    friday: {
      isOpenAllDay: Boolean,
      hours: Array
    },
    saturday: {
      isOpenAllDay: Boolean,
      hours: Array
    },
  }
})


var Sites = mongoose.model('Sites', siteSchema);
module.exports = Sites;
