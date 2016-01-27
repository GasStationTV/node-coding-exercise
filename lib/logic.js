import { Sites } from '../models/index.js';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import { ERROR } from './errors.js';

/*=============== MAIN LOGIC  ===============*/

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
      isfinished = false;

  var response = {isValid: true, msg: 'SUCCESS'};

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

  while(response.isValid && !isfinished){
    for(var key in data){
      switch(key){
        case 'name':
          VALIDATE.siteName(data.name, result, response);
        break;
        case 'street':
          VALIDATE.street(data.street, result, response);
        break;
        case 'city':
          VALIDATE.city(data.city, result, response);
        break;
        case 'state':
          VALIDATE.state(data.state, result, response);
        break;
        case 'timezone':
          VALIDATE.timezone(data.timezone, result, response);
        break;
        case 'phone':
          VALIDATE.phone(data.phone, result, response);
        break;
        case 'email':
          VALIDATE.email(data.email, result, response);
        break;
        case 'primaryContactName':
          VALIDATE.primaryContact(data.primaryContactName, result, response);
        break;
        case 'otherContacts':
          VALIDATE.otherContacts(data.otherContacts, result, response);
        break;
        case 'lastUpdated':
          VALIDATE.lastUpdated(result);
        break;
        case 'observedHolidays':
          VALIDATE.observedHolidays(data.observedHolidays, result, response);
        break;
        case 'schedule':
          for(var day in schedule){
            switch(day){
              case 'sunday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('sunday', data.schedule.sunday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'sunday',
                      result.schedule.sunday.hours || sunday.hours,
                      result,
                      response
                    );
                  break;
                  case 'UPDATE':
                    VALIDATE.isOpenAllDay('sunday', data.schedule.sunday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'sunday',
                      result.schedule.sunday.hours || sunday.hours,
                      result,
                      response
                    );
                  break;
                }
              break;
              case 'monday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('monday', monday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'monday',
                      result.schedule.monday.hours || monday.hours,
                      result,
                      response
                    );
                  break;
                  case 'UPDATE':
                    VALIDATE.isOpenAllDay('monday', monday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'monday',
                      result.schedule.monday.hours || monday.hours,
                      result,
                      response
                    );
                  break;
                }
              break;
              case 'tuesday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('tuesday', tuesday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'tuesday',
                       result.schedule.tuesday.hours || tuesday.hours,
                       result,
                       response
                     );
                  break;
                  case 'UPDATE':
                    VALIDATE.isOpenAllDay('tuesday', tuesday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'tuesday',
                       result.schedule.tuesday.hours || tuesday.hours,
                       result,
                       response
                     );
                  break;
                }
              break;
              case 'wednesday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('wednesday', wednesday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'wednesday',
                      result.schedule.wednesday.hours || wednesday.hours,
                      result,
                      response
                    );
                  break;
                  case 'UPDATE':
                    VALIDATE.isOpenAllDay('wednesday', wednesday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'wednesday',
                      result.schedule.wednesday.hours || wednesday.hours,
                      result,
                      response
                    );
                  break;
                }
              break;
              case 'thursday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('thursday', thursday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'thursday',
                      result.schedule.thursday.hours || thursday.hours,
                      result,
                      response
                    );
                  break;
                  case 'UPDATE':
                    VALIDATE.isOpenAllDay('thursday', thursday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'thursday',
                      result.schedule.thursday.hours || thursday.hours,
                      result,
                      response
                    );
                  break;
                }
              break;
              case 'friday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('friday', friday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'friday',
                      result.schedule.friday.hours || friday.hours,
                      result,
                      response
                    );
                  break;
                  case 'UPDATE':
                    VALIDATE.isOpenAllDay('friday', friday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'friday',
                      result.schedule.friday.hours || friday.hours,
                      result,
                      response
                    );
                  break;
                }
              break;
              case 'saturday':
                switch(verb.toUpperCase()){
                  case 'CREATE':
                    VALIDATE.isOpenAllDay('saturday', saturday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'saturday',
                      result.schedule.saturday.hours || saturday.hours,
                      result,
                      response
                    );
                  break;
                  case 'UPDATE':
                    VALIDATE.isOpenAllDay('saturday', saturday.isOpenAllDay, result, response);
                    VALIDATE.createHours(
                      'saturday',
                      result.schedule.saturday.hours || saturday.hours,
                      result,
                      response
                    );
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
  return {isValid: response.isValid, body: result, msg: response.msg};
}


/*========== Validation functions library, easily extendable ==========*/

export var VALIDATE = {

  siteName: function(data, result, response){
    isValueNull(data) ? (response.isValid=false, response.msg=ERROR.ITEM_REQUIRED('NAME')) :
                        result.name=data.toUpperCase();
  },

  street: function (data, result, response) {
    // possibly re-arrange address-format in the future
    isValueNull(data) ? (response.isValid=false, response.msg=ERROR.ITEM_REQUIRED('STREET')) :
                        result.street=data.toUpperCase();
  },

  city: function(data, result, response) {
    // possibly cross reference again spelling, citities, location, or zip?
    isValueNull(data) ? (response.isValid=false, response.msg=ERROR.ITEM_REQUIRED('CITY')) :
                        result.city=data.toUpperCase();
  },

  state: function(data,result, response) {
    // possibly cross reference array of availble states/timezones
    isValueNull(data) ? (response.isValid=false, response.msg=ERROR.ITEM_REQUIRED('STATE')) :
                        result.state=data.toUpperCase();
  },

  timezone: function(data, result, response){
    if(isValueNull(data) || !isTzFormatted(data)){
      response.isValid=false;
      response.msg = ERROR.ITEM_REQUIRED('TIMEZONE');
    }
    else if(isTzFormatted(data)){
      result.timezone=data.toUpperCase();
    }
  },

  phone: function(data, result, response){
    isValueNull(data) ? (response.isValid=false, response.msg=ERROR.ITEM_REQUIRED('PHONE')) :
                        result.phone=data.toUpperCase();
  },

  email: function(data, result, response){
    isValueNull(data) ? (response.isValid=false, response.msg=ERROR.ITEM_REQUIRED('EMAIL')) :
                        result.email=data.toUpperCase();
  },

  primaryContact: function(data, result, response){
    isValueNull(data) ? (response.isValid=false, response.msg=ERROR.ITEM_REQUIRED('Primary Contact')) :
                        result.primaryContactName=data.toUpperCase();
  },

  otherContacts: function(data, result){
    if(Array.isArray(data)){
      isValueNull(data) ? result.otherContacts=[] : result.otherContacts=stringArrayBuilder(data);
    }
  },

  lastUpdated: function(result){
    result.lastUpdated = Date.now();
  },

  observedHolidays: function(data, result) {
    if(Array.isArray(data)){
      isValueNull(data) ? result.observedHolidays=[] : result.observedHolidays=stringArrayBuilder(data);
    }
  },

  isOpenAllDay: function(day, data, result, response) {
    if(typeof data === 'boolean'){
      const defaultTime = [{open: '0000', close: '2400'}];
        switch(day){
          case 'sunday':
            result.schedule.sunday.isOpenAllDay = data;
            if(data){ result.schedule.sunday.hours=defaultTime; }
          break;
          case 'monday':
            result.schedule.monday.isOpenAllDay = data;
            if(data){ result.schedule.monday.hours=defaultTime; }
          break;
          case 'tuesday':
            result.schedule.tuesday.isOpenAllDay = data;
            if(data){ result.schedule.tuesday.hours=defaultTime; }
          break;
          case 'wednesday':
            result.schedule.wednesday.isOpenAllDay = data;
            if(data){ result.schedule.wednesday.hours=defaultTime; }
          break;
          case 'thursday':
            result.schedule.thursday.isOpenAllDay = data;
            if(data){ result.schedule.thursday.hours=defaultTime; }
          break;
          case 'friday':
            result.schedule.friday.isOpenAllDay = data;
            if(data){ result.schedule.friday.hours=defaultTime; }
          break;
          case 'saturday':
            result.schedule.saturday.isOpenAllDay = data;
            if(data){ result.schedule.saturday.hours=defaultTime; }
          break;
      }
    } else {
       response.isValid = false;
       response.msg = ERROR.INCORRECT_FORMAT('isOpenAllDay');
     }
  },
  createHours: function(day, input, result, response){
    let valid = true,
        loopfinished = false;
    var holder = [];
    if(input != null){
      while(valid && !loopfinished){
        input.forEach(timeSlot => {
            if (timeSlot.open > timeSlot.close){
              response.isValid = false;
              response.msg = ERROR.END_BEFORE_START(day, timeSlot);
              valid = false;
            }
            if (timeSlot.open == timeSlot.close){
              response.isValid = false;
              response.msg = ERROR.TIMES_EQUAL(day, timeSlot);
              valid = false;
            }
            if ((timeSlot.open || timeSlot.close) == null){
              response.isValid = false;
              response.msg = ERROR.NULL_TIME(day, timeSlot);
              valid = false;
            }
            if (timeSlot.open < timeSlot.close){
              holder.push({open: timeSlot.open, close: timeSlot.close});
            }
        });
        if(holder.length === input.length){
          loopfinished = true;
          if(!checkOverlap(holder)){
            switch(day){
              case 'sunday':
                result.schedule.sunday.hours=holder;
              break;
              case 'monday':
                result.schedule.monday.hours=holder;
              break;
              case 'tuesday':
                result.schedule.tuesday.hours=holder;
              break;
              case 'wednesday':
                result.schedule.wednesday.hours=holder;
              break;
              case 'thursday':
                result.schedule.thursday.hours=holder;
              break;
              case 'friday':
                result.schedule.friday.hours=holder;
              break;
              case 'saturday':
                result.schedule.saturday.hours=holder;
              break;
            }
          } else {
            response.isValid = false;
            response.msg = ERROR.TIMES_OVERLAP(day);
          }
        }
      }
    } else {
      response.isValid = false;
      response.msg = ERROR.ITEM_REQUIRED(day);
    }
  }
};


// Checks for Missing values in Strings or Arrays/ unassigned variables
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
  var output = input.map(function(val){
    return val.trim().toUpperCase();
  });
  return output;
}

// Sorts Times
/*=== Input: Array of timeslots, Returns: sorted array by open time ===*/
export function sortItems(array){
  array.sort(function (a, b) {
    if (a.open > b.open) {
      return 1;
    }
    if (a.open < b.open) {
      return -1;
    }
    return 0;
  });
  return array;
}

// Checks overlap
/*== Input: Array of timeslots, Return: bool based on overlapping times ===*/
export function checkOverlap(array){
   var sorted = sortItems(array);
   var overlap = false;
   for(var i = 1; i<sorted.length; i++){
       var prev = sorted[i-1];
       var cur = sorted[i];
       if(prev.close >= cur.open){
           overlap = true;
       }
   }
   return overlap;
}

// Checks and formats Timezone
/*=== Input: String, Returns: Bool  ===*/
export function isTzFormatted(data){
  const timezones =['AST','EST','CST','MST','PST','AKST','HAST'];
  let match = false;
  timezones.forEach(tz => {
      data.trim().toUpperCase() === tz ? match=true : '';
  });
  return match;
}


/*=============== Data Access Methods ===============*/

// Retrieve all sites
export function getAllSites(){
  return Sites.find({});
}

//Retrive one site
export function getSite(id){
  return Sites.findOne({_id: id});
}

// Patch with $set
export function patchSite(id, body){
  return Sites.update({_id: id}, {$set: body});
}

// Update the entire object body
export function updateSite(id,body) {
  return Sites.update({_id: id}, {body});
}

// Delete Site
export function deleteSite(id) {
  return Sites.remove({_id: id});
}

// Create Site & Schedule Object
export function createSiteAndSchedule(obj){
  return Sites.create(obj);
}

// Default update method.  Pass new valid object into the doc
export function updateDocument(id, obj){
  return Sites.update({_id: id}, obj);
}
