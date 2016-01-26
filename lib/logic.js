import { Sites } from '../models/index.js';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import { ERROR } from './validations.js'

/*========== MAIN LOGIC  ==========*/

// Validates and formats Request Body (Jump table style === fast)
/*=== Input: create/update verb, request body, Returns: result object ===*/
export function validateBody(verb, data){
  var schedule = data.schedule,
      sunday = schedule.sunday,
      monday = schedule.monday,
      tuesday = schedule.tuesday,
      wednesday = schedule.wednesday,
      thursday = schedule.thursday,
      friday = schedule.friday,
      saturday = schedule.saturday,
      isValid = true,
      isfinished = false;

  // model for construction
  var result = {
    schedule: {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {}
    }
  };

  while(isValid && !isfinished){
    for(var key in data){
      switch(key){
        case 'name':
          VALIDATE.name(data.name, result, isValid);
        break;
        case 'street':
          VALIDATE.street(data.street, result, isValid);
        break;
        case 'city':
          VALIDATE.city(data.city, result, isValid);
        break;
        case 'state':
          VALIDATE.state(data.state, result, isValid);
        break;
        case 'timezone':
          VALIDATE.timezone(data.timezone, result, isValid);
        break;
        case 'phone':
          VALIDATE.phone(data.phone, result, isValid);
        break;
        case 'email':
          VALIDATE.email(data.email, result, isValid);
        break;
        case 'primaryContactName':
          VALIDATE.primaryContact(data.primaryContactName, result, isValid);
        break;
        case 'otherContacts':
          VALIDATE.otherContacts(data.otherContacts, result, isValid);
        break;
        case 'lastUpdated':
          VALIDATE.lastUpdated(result);
        break;
        case 'observedHolidays':
          VALIDATE.observedHolidays(data.observedHolidays, result, isValid)
        break;
        case 'schedule':
          for(var day in schedule){
            switch(day){
              case 'sunday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('sunday', data.schedule.sunday.isOpenAllDay, result, isValid)
                    VALIDATE.createHours('sunday', sunday.hours, result, isValid)
                  break;
                  case 'UPDATE':
                    //validate for update
                    //update requires async
                  break;
                }
              break;
              case 'monday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('monday', monday.isOpenAllDay, result, isValid)
                    VALIDATE.createHours('monday', monday.hours, result, isValid)
                  break;
                  case 'UPDATE':
                    //validate for update
                  break;
                }
              break;
              case 'tuesday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('tuesday', tuesday.isOpenAllDay, result, isValid)
                    VALIDATE.createHours('tuesday', tuesday.hours, result, isValid)
                  break;
                  case 'UPDATE':
                    //validate for update
                  break;
                }
              break;
              case 'wednesday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('wednesday', wednesday.isOpenAllDay, result, isValid)
                    VALIDATE.createHours('wednesday', wednesday.hours, result, isValid)
                  break;
                  case 'UPDATE':
                    //validate for update
                  break;
                }
              break;
              case 'thursday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('thursday', thursday.isOpenAllDay, result, isValid)
                    VALIDATE.createHours('thursday', thursday.hours, result, isValid)
                  break;
                  case 'UPDATE':
                    //validate for update
                  break;
                }
              break;
              case 'friday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('friday', friday.isOpenAllDay, result, isValid)
                    VALIDATE.createHours('friday', friday.hours, result, isValid)
                  break;
                  case 'UPDATE':
                    //validate for update
                  break;
                }
              break;
              case 'saturday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('saturday', saturday.isOpenAllDay, result, isValid)
                    VALIDATE.createHours('saturday', saturday.hours, result, isValid)
                  break;
                  case 'UPDATE':
                    //validate for update
                  break;
                }
                isfinished = true;
              break;
            }
          }
        break;
      }
    }
  }
  return {isValid: isValid, body: result, msg: 'ok'}
}


/*=== Validation functions library, easily extendable ===*/
export var VALIDATE = {

  name: function(data, result, isValid){
    isValueNull(data) ? isValid=false : result.name=data.toUpperCase();
  },

  street: function (data, result, isValid) {
    // possibly re-arrange address-format in the future
    isValueNull(data) ? isValid=false : result.street=data.toUpperCase();
  },

  city: function(data, result, isValid) {
    // possibly cross reference again spelling, citities, location, or zip?
    isValueNull(data) ? isValid=false : result.city=data.toUpperCase();
  },

  state: function(data,result, isValid) {
    // possibly cross reference array of availble states/timezones
    isValueNull(data) ? isValid=false : result.state=data.toUpperCase();
  },

  timezone: function(data, result, isValid){
    if(isValueNull(data) || !isTzFormatted(data)){
      isValid=false;
    }
    else if(isTzFormatted(data)){
      result.timezone=data.toUpperCase();
    }
  },

  phone: function(data, result, isValid){
    isValueNull(data) ? isValid=false : result.phone=data.toUpperCase();
  },

  email: function(data, result, isValid){
    isValueNull(data) ? isValid=false : result.email=data.toUpperCase();
  },

  primaryContact: function(data, result, isValid){
    isValueNull(data) ? isValid=false : result.primaryContactName=data.toUpperCase();
  },

  otherContacts: function(data, result, isValid){
    if(Array.isArray(data)){
      isValueNull(data) ? result.otherContacts=[] : result.otherContacts=stringArrayBuilder(data);
    }
  },

  lastUpdated: function(result){
    // this can all change based on the use of Moment and the client
    result.lastUpdated = Date.now();
  },

  observedHolidays: function(data, result, isValid) {
    // holidays array can be parsed on the client from ex: moment
    if(Array.isArray(data)){
      isValueNull(data) ? result.observedHolidays=[] : result.observedHolidays=stringArrayBuilder(data);
    }
  },

  isOpenAllDay: function(day, data, result, isValid) {
    if(typeof data === 'boolean'){
      const defaultTime = [{open: '0000', close: '2400'}];
        switch(day){
          case 'sunday':
            result.schedule.sunday.isOpenAllDay = data;
            if(data){ result.schedule.sunday.hours=defaultTime }
          break;
          case 'monday':
            result.schedule.monday.isOpenAllDay = data;
            if(data){ result.schedule.monday.hours=defaultTime }
          break;
          case 'tuesday':
            result.schedule.tuesday.isOpenAllDay = data;
            if(data){ result.schedule.tuesday.hours=defaultTime }
          break;
          case 'wednesday':
            result.schedule.wednesday.isOpenAllDay = data;
            if(data){ result.schedule.wednesday.hours=defaultTime }
          break;
          case 'thursday':
            result.schedule.thursday.isOpenAllDay = data;
            if(data){ result.schedule.thursday.hours=defaultTime }
          break;
          case 'friday':
            result.schedule.friday.isOpenAllDay = data;
            if(data){ result.schedule.friday.hours=defaultTime }
          break;
          case 'saturday':
            result.schedule.saturday.isOpenAllDay = data;
            if(data){ result.schedule.saturday.hours=defaultTime }
          break;
      }
    } else {
       isValid = false;
     }
  },
  createHours: function(day, input, output, isValid){
    let valid = true,
        loopfinished = false;
    var holder = [];

    if(input.length > 0){
      while(valid && !loopfinished){
        input.forEach(timeSlot => {
            if (timeSlot.open > timeSlot.close){
              isValid = false;
              valid = false;
            }
            if (timeSlot.open == timeSlot.close){
              isValid = false;
              valid = false;
            }
            if (timeSlot.open || timeSlot.close == null){
              isValid = false;
              valid = false;
            }
            if (timeSlot.open < timeSlot.close){
              holder.push({open: timeSlot.open, close: timeSlot.close})
            }
        })
        if(holder.length === input.length){
          loopfinished = true;
          if(!checkOverlap(holder)){
            switch(day){
              case 'sunday':
                result.schedule.sunday.hours=holder
              break;
              case 'monday':
                result.schedule.monday.hours=holder
              break;
              case 'tuesday':
                result.schedule.tuesday.hours=holder
              break;
              case 'wednesday':
                result.schedule.wednesday.hours=holder
              break;
              case 'thursday':
                result.schedule.thursday.hours=holder
              break;
              case 'friday':
                result.schedule.friday.hours=holder
              break;
              case 'saturday':
                result.schedule.saturday.hours=holder
              break;
            }
          } else {
            //send a message with isValid. MSGGGG!!!
            isValid = false;
          }
        }
      }
    } else {
      isValid = false;
    }
  }
}


// Checks for Missing values
/*=== Input: String, Returns: bool ===*/
export function isValueNull(str) {
  if(str == null || undefined || (str.length === 0)){
    return true;
  } else {
    return false;
  }
}

// Cleans array of strings
/*=== Input: Array of Strings,  Returns: Array (trimmed and uppercase) ===*/
export function stringArrayBuilder(input){
  let output = input.map(val => {
    val.trim().toUpperCase();
  })
  return output
}

// Sorts Times
/*=== Input: Array of timeslots, Returns: sorted array by open time ===*/
export function sortTimes(array){
  array.sort(function (a, b) {
    if (a.open > b.open) {
      return 1;
    }
    if (a.open < b.open) {
      return -1;
    }
    return 0;
  });
  return array
}

// Checks overlap
/*== Input: Array of timeslots, Return: bool based on overlapping times ===*/
export function checkOverlap(array){
   var sorted = sortItems(array);
   var overlap = false;
   for(i=1; i<sorted.length; i++){
       var prev = better[i-1]
       var cur = better[i]
       if(prev.close >= cur.open){
           overlap = true;
       }
   }
   return overlap
}

// Checks and formats Timezone
/*=== Input: String, Returns: Bool  ===*/
export function isTzFormatted(data){
  data.toUpperCase();
  const timezones =['AST','EST','CST','MST','PST','AKST','HAST'];
  let match = false;
  timezones.forEach(tz => {
      data === tz ? match=true : '';
  })
  return match
}


/*========== Data Access Methods ==========*/

// Retrieve all sites
export function getAllSites(){
  return Sites.find({});
}

// Patch with $set
export function patchSite(id, body){
  return Sites.update({_id: id}, {$set: body});
}

// Update the entire object body
export function updateSite(id,body) {
  return Sites.update({_id: id}, {body});
}

/* Backup Hard Coded create method - Fix mongoose model
 so you can instantiate properly. */
export function createSiteAndSchedule(obj){
  return Sites.create({
    name: obj.name,
    street: obj.street,
    city: obj.city,
    state: obj.state,
    timezone: obj.timezone,
    phone: obj.phone,
    email: obj.email,
    primaryContactName: obj.primaryContactName,
    otherContacts: obj.otherContacts,
    lastUpdated:  obj.lastUpdated,
    observedHolidays: obj.observedHolidays,
    schedule: {
      sunday: {
        isOpenAllDay: obj.schedule.sunday.isOpenAllDay,
        hours: obj.schedule.sunday.hours
      },
      monday: {
        isOpenAllDay: obj.schedule.monday.isOpenAllDay,
        hours: obj.schedule.monday.hours
      },
      tuesday: {
        isOpenAllDay: obj.schedule.tuesday.isOpenAllDay,
        hours: obj.schedule.tuesday.hours
      },
      wednesday: {
        isOpenAllDay: obj.schedule.wednesday.isOpenAllDay,
        hours: obj.schedule.wednesday.hours
      },
      thursday: {
        isOpenAllDay: obj.schedule.thursday.isOpenAllDay,
        hours: obj.schedule.thursday.hours
      },
      friday: {
        isOpenAllDay: obj.schedule.friday.isOpenAllDay,
        hours: obj.schedule.friday.hours
      },
      saturday: {
        isOpenAllDay: obj.schedule.saturday.isOpenAllDay,
        hours: obj.schedule.saturday.hours
      },
    }
  });
}
