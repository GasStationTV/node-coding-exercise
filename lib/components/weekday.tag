weekday(class='{closed: this.hoursToday.length === 0}')
  h5 { weekday }
  button.action.allday Open 24 Hours
  button.action.add Add Hours
  hour(each='{ this.hoursToday }')
    
  script.
    this.hoursToday = this.parent.hours.filter(function(hour){
      return this.i === hour.weekday
    }.bind(this))
