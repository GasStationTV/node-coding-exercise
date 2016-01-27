/*=== Custom error messages ===*/

export const ERROR = {

  // Unable to Create/Update: {itemName} is required.
  ITEM_REQUIRED: function(item){ return `Unable to CREATE/UPDATE. ${item} value is Missing and Required`;},

  // Unable to Create/Update: {itemName} {itemValue} already exists.
  DUPLICATE_ENTRY: function(item){ return `Unable to CREATE/UPDATE, ${item} already exits.`;},

  // Unable to Create/Update: The start time must be before the end time
  END_BEFORE_START: function(day,item){ return `${day, item}: The end time must be earlier than the start.`;},

  // Unable to Create/Update: The start time may not be the same date as the end time
  TIMES_EQUAL: function(day, item){ return `${day, item}: The start and end times cannot be the same.`;},

  // NULL TIMESLOT
  NULL_TIME: function(day, item) {return `${day, item}: The times cannot be null.`;},

  // TIME_OVERLAP
  TIMES_OVERLAP: function(day) {return `${day}: Adjust Timeslots, HOURS OVERLAP.`;},

  // INCORRECT FORMAT:
  INCORRECT_FORMAT: function(item){ return `${item} is formatted incorrectly.`;}

};
