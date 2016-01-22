import { Sites, Schedules, TimeSlot } from '../models/index.js';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import ERROR from './validations.js'
/*------ SITE LOGIC ------*/

// Create a New Site
export function newSite(obj) {
  return Sites.create({
    site_name: obj.site_name,
    address: obj.address,
    telephone: obj.phone,
    timezone: obj.timezone,
    schedule: obj.schedule,
  },{ runValidators: true }, function(err){
    return err
  })
}

export function makeNewSchedule(siteId){
  return Schedules.create({site_id: siteId},{ runValidators: true },
    function(err){
    return err
  });
}




export function addScheduleToSite(siteId, scheduleId) {
  return Sites.update(
    {_id: siteId},
    { $push: {schedule: schedule._id }},
    { runValidators: true }, function(err){
      return err
    }
  )
}

// Find One Site
export function findSiteById(id) {
  return Sites.findOne({_id: id});
}

// Find All Sites
export function findAllSites() {
  return Sites.find({});
}


/*----- TIMESLOTS LOGIC -----*/

//create a new TimeSlot
export function createTimeSlot(scheduleId, open, close) {
  return TimeSlot.create({
    schedule_id: scheduleId,
    open: open,
    close: close
  },{ runValidators: true }, function(err){
    return err
  })
}

// Find One  TimeSlot
export function findTimeSlot(id) {
  return TimeSlot.findOne({_id: id})
}

// Find all TimeSlots in the Hours array.
export function populateHours(scheduleId){
  return findScheduleById(scheduleId).populate('hours')
}

// Add timeSlot a specific array
export function addTimeslotToDay(time, day){
  switch(day){
    case "sunday":

      break;
    case "monday":

      break;
    case "tuesday":

      break;
    case "wednesday":

      break;
    case "thursday":

      break;
    case "friday":

      break;
    case "saturday":

      break;
  }
}


// All moment formatting depends on client
// and how they want to store it.

// Timestamp is already formatted for NOW in 24 format
// EX: For future updates, convert "HH-MM".
// assume input is a concatenated string ex: "1230" => 12:30
export function formatTimeslot(input){
  return moment(input, "hmm").format("HH:mm")
}



/*------ SCHEDULE LOGIC -------*/

//Create a New BLANK Schedule
export function createSchedule(siteId, data, arr){
  return Schedules.create({
    site_id: siteId,
    days: {
      sunday: {
        isOpenAllDay: arr[0],
        hours: []
      },
      monday: {
        isOpenAllDay: arr[1],
        hours: []
      },
      tuesday: {
        isOpenAllDay: arr[2],
        hours: []
      },
      wednesday: {
        isOpenAllDay: arr[3],
        hours: []
      },
      thursday: {
        isOpenAllDay: arr[4],
        hours: []
      },
      friday: {
        isOpenAllDay: arr[5],
        hours: []
      },
      saturday: {
        isOpenAllDay: arr[6],
        hours: []
      }
    }
  }).then(function (schedule) {
    return Promise.all([
        createTimeSlot(schedule._id, data['sunday.open'], data['sunday.close']),
        createTimeSlot(schedule._id, data['monday.open'], data['monday.close']),
        createTimeSlot(schedule._id, data['tuesday.open'], data['tuesday.close']),
        createTimeSlot(schedule._id, data['wednesday.open'], data['wednesday.close']),
        createTimeSlot(schedule._id, data['thursday.open'], data['thursday.close']),
        createTimeSlot(schedule._id, data['friday.open'], data['friday.close']),
        createTimeSlot(schedule._id, data['saturday.open'], data['saturday.close'])
      ])
      .then(function (days) {
        return Schedules.update({_id: schedule._id}, { $push: {
          "days.sunday.hours": days[0]._id,
          "days.monday.hours": days[1]._id,
          "days.tuesday.hours": days[2]._id,
          "days.wednesday.hours": days[3]._id,
          "days.thursday.hours": days[4]._id,
          "days.friday.hours": days[5]._id,
          "days.saturday.hours": days[6]._id
        }})
      })
  })
}

// Find One Schedule
export function findScheduleById(id) {
  return Schedules.findOne({_id: id});
}

// Find all Schedules in Schedule Array
export function getSchedules(siteId) {
  return findSiteById(siteId).populate('schedule')
}

// Update a Schedule
export function updateSchedule(scheduleId, data) {
  console.log('IM HERE')
  Promise.all([
    createTimeSlot(scheduleId, data['sunday.open'], data['sunday.close']),
    createTimeSlot(scheduleId, data['monday.open'], data['monday.close']),
    createTimeSlot(scheduleId, data['tuesday.open'], data['tuesday.close']),
    createTimeSlot(scheduleId, data['wednesday.open'], data['wednesday.close']),
    createTimeSlot(scheduleId, data['thursday.open'], data['thursday.close']),
    createTimeSlot(scheduleId, data['friday.open'], data['friday.close']),
    createTimeSlot(scheduleId, data['saturday.open'], data['saturday.close'])
  ]).then(function (dayz) {
    console.log('PROMISE ALLLING',dayz)
    return Schedules.update({_id: scheduleId},
      {
        days: {
          sunday: {
            isOpenAllDay: data['sunday.isOpenAllDay'] || false,
            hours: [days[0]._id]
          },
          monday: {
            isOpenAllDay: data['monday.isOpenAllDay'] || false,
            hours: [days[1]._id]
          },
          tuesday: {
            isOpenAllDay: data['tuesday.isOpenAllDay'] || false,
            hours: [days[2]._id]
          },
          wednesday: {
            isOpenAllDay: data['wednesday.isOpenAllDay'] || false,
            hours: [days[3]._id]
          },
          thursday: {
            isOpenAllDay: data['thursday.isOpenAllDay'] || false,
            hours: [days[4]._id]
          },
          friday: {
            isOpenAllDay: data['friday.isOpenAllDay'] || false,
            hours: [days[5]._id]
          },
          saturday: {
            isOpenAllDay: data['saturday.isOpenAllDay'] || false,
            hours: [days[6]._id]
          }
        }
      },
      { runValidators: true }, function(err){
        return err
      }
    )
  })
}


/* -------- Extra Logic --------*/

//// Find Entire Populated Object
export function getFinalObj(siteId){
  return Sites.findOne({_id: siteId}).then(function (site) {
    return site.populate('schedule').then(function (obj) {
      return obj.populate('hours')
    })
  })
}
