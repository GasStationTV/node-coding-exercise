weekday(class='{closed: this.hoursToday.length === 0}')
  h5 { weekday }
  button.action.add(onclick='{this.newOpening}') Add Hours
  hour(each='{ this.hoursToday }')
    
  script.
    this.hoursToday = this.parent.hours.filter(function(hour){
      return this.i === hour.weekday
    }.bind(this));
    this.newOpening = function(){
      this.hoursToday.unshift({
        opening: 0,
        closing: 1440
      });
    }.bind(this);
