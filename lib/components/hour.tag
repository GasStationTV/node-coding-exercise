hour
  opening(tabindex='0') { this.format(this.opening) }
    dropdown.action(data='{this.openingAlternatives}')
  closing(tabindex='1') { this.format(this.closing) }
    dropdown.action(data='{this.closingAlternatives}')
  button.action.remove Remove
  script.
    var alternatives = [
      'Midnight',
      '12:30AM',
      '1:00AM',
      '1:30AM',
      '2:00AM',
      '2:30AM',
      '3:00AM',
      '3:30AM',
      '4:00AM',
      '4:30AM',
      '5:00AM',
      '5:30AM',
      '6:00AM',
      '6:30AM',
      '7:00AM',
      '7:30AM',
      '8:00AM',
      '8:30AM',
      '9:00AM',
      '9:30AM',
      '10:00AM',
      '10:30AM',
      '11:00AM',
      '11:30AM',
      '12:00PM',
      '12:30PM',
      '1:00PM',
      '1:30PM',
      '2:00PM',
      '2:30PM',
      '3:00PM',
      '3:30PM',
      '4:00PM',
      '4:30PM',
      '5:00PM',
      '5:30PM',
      '6:00PM',
      '6:30PM',
      '7:00PM',
      '7:30PM',
      '8:00PM',
      '8:30PM',
      '9:00PM',
      '9:30PM',        
      '10:00PM',
      '10:30PM',
      '11:00PM',
      '11:30PM',
      'Midnight',
      '12:30AM Day after',
      '1:00AM Day after',
      '1:30AM Day after',
      '2:00AM Day after',
      '2:30AM Day after',
      '3:00AM Day after',
      '3:30AM Day after',
      '4:00AM Day after',
      '4:30AM Day after',
      '5:00AM Day after',
      '5:30AM Day after',
      '6:00AM Day after'
    ];
    this.openingAlternatives = alternatives.slice(0, 48)
    this.closingAlternatives = alternatives.slice(23, 61)
    this.format = function(minutes){
      var hour = Math.floor(Math.abs(minutes / 60));
      var midday = 'AM';
      if(hour >= 12) {
        midday = 'PM';
        if(hour >= 24) {
          hour = hour - 24;
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
      content: 'Opens ';
    }
    :scope closing:before {
      content: 'Closes ';
    }
