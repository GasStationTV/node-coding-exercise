station(class='{open: this.isOpen()}')
  h3(onclick='{this.edit}') { this.brand || 'Brand' }
  .week
    weekday(each='{weekday, i in this.weekdays}')
  script.
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.edit = function(){
      console.log(this)
      this.el.setAttribute('contentEditable', 'true');
    }.bind(this)
    this.isOpen = function(){
      // timezone
      for(var i = 0; i < this.hours.length; i++){
        //- new Date()
      }
    }.bind(this)
