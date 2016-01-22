import moment from 'moment';
import moment_timezone from 'moment-timezone';
import express from 'express';
import * as db from '../lib/logic';
var router = express.Router();

// Get all Sites
router.get('/', function(req,res,next) {
  db.findAllSites()
  .then(function (sites) {
    res.render('allSites', {allSites: sites})
  })
})



// Site Page with Schedule
router.get('/:id/schedule', function(req, res, next) {
  db.getSchedules(req.params.id)
  .then(function (data) {
    console.log(data)
    let site = data,
        weekdays = data.schedule[0]['days'];
    res.render('schedule', {site: site, days: weekdays})
  })
});

router.get('/newSchedule', function(req,res,next) {
  let x = db.createTimeSlot()
  res.send(x)
})


// Form to Update Schedule
router.get('/:id/schedule/new', function(req, res, next) {
  let id = req.params.id;
  res.render('newSchedule', {site: id});
});

//  Post the New/Updated Schedule
router.post('/:id/schedule/new', function(req, res, next) {
  let x = req.body;
  let id = req.params.id;
  let boolArr = [
    x['sunday.isOpenAllDay'],
    x['monday.isOpenAllDay'],
    x['tuesday.isOpenAllDay'],
    x['wednesday.isOpenAllDay'],
    x['thursday.isOpenAllDay'],
    x['friday.isOpenAllDay'],
    x['saturday.isOpenAllDay']
  ]

  db.createSchedule(id, x, boolArr).then(function (schedule) {
    console.log('new schedule', schedule)
    res.send('MY OBJ', schedule)
  })

  // Promise.all([
  //   db.createTimeSlot(id, x['sunday.open'], x['sunday.close']),
  //   db.createTimeSlot(id, x['monday.open'], x['monday.close']),
  //   db.createTimeSlot(id, x['tuesday.open'], x['tuesday.close']),
  //   db.createTimeSlot(id, x['wednesday.open'], x['wednesday.close']),
  //   db.createTimeSlot(id, x['thursday.open'], x['thursday.close']),
  //   db.createTimeSlot(id, x['friday.open'], x['friday.close']),
  //   db.createTimeSlot(id, x['saturday.open'], x['saturday.close'])
  // ]).then(function (days) {
  //   console.log('days')
  //   db.findSiteById(id)
  //   .then(function (site) {
  //     console.log('site', site.schedule[0])
  //     Schedules.findOne(site.schedule[0])
  //     .then(function (schedule) {
  //       console.log('update', schedule._id)
  //       Schedules.update({_id: schedule._id},{
  //         $set: {
  //           days: {
  //               sunday: {

  //                 isOpenAllDay: x['sunday.isOpenAllDay'],
  //                 hours: [days[0]._id]
  //               },
  //               monday: {
  //                 isOpenAllDay: x['monday.isOpenAllDay'],
  //                 hours: [days[1]._id]
  //               },
  //               tuesday: {
  //                 isOpenAllDay: x['tuesday.isOpenAllDay'],
  //                 hours: [days[2]._id]
  //               },
  //               wednesday: {
  //                 isOpenAllDay: x['wednesday.isOpenAllDay'],
  //                 hours: [days[3]._id]
  //               },
  //               thursday: {
  //                 isOpenAllDay: x['thursday.isOpenAllDay'],
  //                 hours: [days[4]._id]
  //               },
  //               friday: {
  //                 isOpenAllDay: x['friday.isOpenAllDay'],
  //                 hours: [days[5]._id]
  //               },
  //               saturday: {
  //                 isOpenAllDay: x['saturday.isOpenAllDay'] ,
  //                 hours: [days[6]._id]
  //               }
  //             }
  //         }
  //       }).then(function () {
  //         console.log('CLOSE')
  //         res.redirect('/')
  //       })
  //     })
  //   })

    // console.log(days)
    //  let temp = new Schedules({
    //   site_id: req.params.id,
    //   days: {
    //     sunday: {
    //       isOpenAllDay: x['sunday.isOpenAllDay'],
    //       hours: [days[0]._id]
    //     },
    //     monday: {
    //       isOpenAllDay: x['monday.isOpenAllDay'],
    //       hours: [days[1]._id]
    //     },
    //     tuesday: {
    //       isOpenAllDay: x['tuesday.isOpenAllDay'],
    //       hours: [days[2]._id]
    //     },
    //     wednesday: {
    //       isOpenAllDay: x['wednesday.isOpenAllDay'],
    //       hours: [days[3]._id]
    //     },
    //     thursday: {
    //       isOpenAllDay: x['thursday.isOpenAllDay'],
    //       hours: [days[4]._id]
    //     },
    //     friday: {
    //       isOpenAllDay: x['friday.isOpenAllDay'],
    //       hours: [days[5]._id]
    //     },
    //     saturday: {
    //       isOpenAllDay: x['saturday.isOpenAllDay'] ,
    //       hours: [days[6]._id]
    //     }
    //   }
    // })
    // temp.save()
    // })


  // console.log(req.body)
  //
  // db.getSchedules(req.params.id)
  // .then(function (data) {
  //   db.updateSchedule(data.schedule[0]['_id'], req.body)
  // })
  // .then(function () {
  //   res.redirect('/')
  // })
})



module.exports = router;
