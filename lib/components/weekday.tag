weekday
  name { weekday }
  hour(each='{ this.hoursToday }')
  script.
    this.hoursToday = this.parent.hours.filter(function(hour){
      return this.i === hour.weekday
    }.bind(this))
