import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var siteSchema = new Schema({
  site_name: { type: String, required: true },
  address: {type: String, required: true},
  telephone: {type: Number, required: true},
  owner: {type: String, required: true},
  timezone: {type: String, required: true},
  schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedules' }],
})
var Sites = mongoose.model('Sites', siteSchema);

module.exports = Sites;
