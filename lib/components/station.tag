station(class='{open: this.isOpen()}')
  name { this.type }
  .week
    weekday(each='{weekday, i in this.weekdays}')
  script.
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.isOpen = function(){ return true }
