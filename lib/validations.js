
const ERROR = {

  // Unable to Create/Update: {itemName} is required.

  // Unable to Create/Update: {itemName} is required.

  // Unable to Create/Update: {itemName} {itemValue} already exists.

  // Unable to Create/Update: The start time must be before the end time

  // Unable to Create/Update: The start time must be before the end time

  // Unable to Create/Update: The start time may not be the same date as the end time

}

export validate = {

// If any required items are null
// Submit fails
// Message
// Unable to Create/Update: {itemName} is required.
  


}


// Unchanged Data Validation
// If any required items are null
// Submit fails
// Message
// Unable to Create/Update: {itemName} is required.


// Duplicate Validation
// If any required items are null
// Submit fails
// Message
// Unable to Create/Update: {itemName} {itemValue} already exists.

// Malformed Data Validation
// If any required items are null
// Submit fails
// Message
// Unable to Create/Update: {itemName} {itemValue} does not match the expected format.


// Time Slot Format Validation
// If the start time falls after the end time
// Message
// Unable to Create/Update: The start time must be before the end time
// If the end time falls before the start time
// Message
// Unable to Create/Update: The start time must be before the end time
// If the start time falls on the end time
// Message
// Unable to Create/Update: The start time may not be the same date as the end time
