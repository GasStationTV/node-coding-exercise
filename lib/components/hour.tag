hour
  opening { this.format(this.opening) }
  closing { this.format(this.closing) }
  script.
    this.format = function(minutes){
      var hour = Math.round(Math.abs(minutes / 60));
      var midday = 'AM';
      // TODO: get a native 12 hour pair of eyes
      if(hour >= 12) {
        midday = 'PM';
        if(hour > 24) {
          hour = hour - 12;
          midday = 'AM next day'
        } else if(hour > 12) {
          hour = hour - 12;
        }
      }
      var minute = Math.abs(minutes % 60);
      if (minutes === 0 || minutes === 1440){
        return 'Midnight'
      }
      return [hour || '12', ':', minute || '00', midday].join('')
    }
  style.
    :scope opening:before {
      content: 'Open ';
    }
    :scope closing:before {
      content: 'Close ';
    }
