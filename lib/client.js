const riot = require('riot');

require('./components');

var store = {
  stations: [
    {
      type: 'texaco',
      location: 'fib',
      hours: [
        {
          opening: 11,
          closing: 12
        }
      ]
    }
  ]
};

riot.mount('app', store);
