const Schema = require('mongoose').Schema;

var overlapping = function(hours){
  for(var i = 0; i < hours.length; i++){
    hours[i].start_time = new Date(0, 0, hours[i].weekday, Math.abs(hours[i].opening / 60), Math.abs(hours[i].opening % 60)).toLocaleTimeString();

    if(end_time < 1440){
      hours[i].end_time = new Date(0, 0, hours[i].weekday, Math.abs(hours[i].closing / 60), Math.abs(hours[i].closing % 60)).toLocaleTimeString();
    } else {
      hours[i].end_time = new Date(0, 0, hours[i].weekday+1, Math.abs(hours[i].closing - 1440 / 60), Math.abs(hours[i].closing % 60)).toLocaleTimeString();
    }
  }
  var sortedHours = hours.sort((a,b)=>{
    return a.start_time - b.start_time;
  });
  return sortedHours.reduce((result, current, i, arr) => {
    if (i === 0) { return result; }
    var previous = arr[i-1];

    var overlap = (previous.end_time > current.start_time);
    if (overlap) {
      return true;
    }
  }, false);
}

var StationSchema = module.exports = Schema({
  type: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  hours: [
    {
      opening: { type: Number, required: true },
      closing: { type: Number, required: true },
      weekday: { type: Number, required: true }
    }
  ]
});

StationSchema.path('hours').validate(overlapping, 'Station has overlapping opening hours');
