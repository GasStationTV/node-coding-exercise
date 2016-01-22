import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var siteSchema = new Schema({
  site_name: String,
  address: String,
  telephone: Number,
  owner: String,
  timezone: String,
  schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedules' }],
})
var Sites = mongoose.model('Sites', siteSchema);

module.exports = Sites;
