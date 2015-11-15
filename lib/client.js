const riot = require('riot');

require('./components');

var store = {
  stations: [
    {
      type: 'Texaco',
      location: 'fib',
      hours: [
        {
          weekday: 3,
          opening: 630,
          closing: 1000
        },
        {
          weekday: 6,
          opening: 0,
          closing: 1440
        }
      ]
    }
  ]
};

riot.mount('app', store);
