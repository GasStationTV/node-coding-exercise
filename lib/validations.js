/*=== Custom error messages ===*/
export const ERROR = {
  // Unable to Create/Update: {itemName} is required.
  ITEM_REQUIRED: function(item){ return `Unable to CREATE/UPDATE ${item}`},
  // Unable to Create/Update: {itemName} {itemValue} already exists.
  DUPLICATE_ENTRY: function(item){ return `Unable to CREATE/UPDATE, ${item} already exits.`},
  // Unable to Create/Update: The start time must be before the end time
  START_BEFORE_END: function(){ return 'The start time must be before the end time'},
  // Unable to Create/Update: The start time must be before the end time
  END_BEFORE_START: function(){ return 'The end time must be earlier than the start'},
  // Unable to Create/Update: The start time may not be the same date as the end time
  TIMES_EQUAL: function(){ return 'The start and end times cannot be the same.'}
}
