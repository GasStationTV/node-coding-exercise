const Rube = require('rube');
const Moment = require('moment');


// Rube awaits PR for array support, so I made a plugin :/

// Rube.plugin('hours', function hours() {
//   return function(hours) {
//     hours.forEach(function(hour){
//       hourSchema(hour);
//     });
//   };
// });

const hourSchema = Rube({
  open: Rube(Number).between(0, 2400),
  close: Rube(Number).between(0, 2400),
  weekday: Rube(Number).between(0, 6)
});


const schema = module.exports = Rube({
  name: Rube(String).between(3, 30),
  location: Rube(String).between(5, 30)
});
