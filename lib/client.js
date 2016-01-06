// first time using riot.js for a project

const riot = require('riot');

require('./components');

// TODO: add a redux store

var store = {
  stations: [
    {
      brand: 'Texaco',
      location: {
        lat: 30,
        lon: 120
      },
      hours: [
        {
          weekday: 3,
          opening: 630,
          closing: 1000
        },
        {
          weekday: 0,
          opening: 0,
          closing: 1440
        }
      ]
    }
  ]
};

riot.mount('app', store);
