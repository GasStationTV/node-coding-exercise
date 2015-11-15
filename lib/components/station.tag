station(class='{open: this.isOpen()}')
  h3(onclick='{this.edit}') { this.brand || 'Brand' }
  .week
    weekday(each='{weekday, i in this.weekdays}')
  button.action.save Save
  script.
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.edit = function(){
      
      this.el.setAttribute('contentEditable', 'true');
    }.bind(this);
    var moment = require('moment');
    this.isOpen = function(){
      // TODO: timezone based on geolocation
      var now = new Date()
      for(var i = 0; i < this.hours.length; i++){
        
      }
    }.bind(this)
