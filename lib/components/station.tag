station(class='{open: this.isOpen() }')
  h3 { this.brand || 'Brand' }
  .week
    weekday(each='{weekday, i in this.weekdays}')
  button.action.save Save
  script.
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var moment = require('moment');
    this.isOpen = function(){
      // TODO: add timezone based on geolocation
      var now = new moment();
      for(var i = 0; i < this.hours.length; i++){
        var start = new Date(0, 0, this.hours[i].weekday, Math.floor(Math.abs(this.hours[i].opening / 60)), Math.abs(this.hours[i].opening % 60)).toLocaleTimeString();
        if(this.hours.closing < 1440){
          var end = new Date(0, 0, this.hours[i].weekday, Math.floor(Math.abs(this.hours[i].closing / 60)), Math.abs(this.hours[i].closing % 60)).toLocaleTimeString();
        } else {
          var end = new Date(0, 0, this.hours[i].weekday+1, Math.floor(Math.abs(this.hours[i].closing - 1440 / 60)), Math.abs(this.hours[i].closing % 60)).toLocaleTimeString();
        }
        var nowDate = new Date(0, 0, now.weekday(), now.hour(), now.minute()).toLocaleTimeString();
        if(moment(end).isAfter(moment(nowDate)) && moment(start).isAfter(moment(nowDate))) return true;
      }
    }.bind(this)
