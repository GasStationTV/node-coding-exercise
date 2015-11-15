station(class='{open: this.isOpen()}')
  h3 { this.type }
  .week
    weekday(each='{weekday, i in this.weekdays}')
  script.
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.isOpen = function(){
      // timezone
      for(var i = 0; i < this.hours.length; i++){
        //- new Date()
      }
    }.bind(this)
