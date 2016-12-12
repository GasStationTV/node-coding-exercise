import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Schedule from './schedule';
import _ from 'lodash';
import moment from 'moment';
import 'moment-range';

const Site = new Schema({
  name: { type: 'String', required: true },
  timezone: { type: 'String'},
  schedules : [Schedule.schema]
});

// name must be unique

// schedules validation
Site.path('schedules').validate(function(schedules) {
  if(!schedules) {
    return true;
  }

  let valid = true;

  // group schedules into dow groupings, then compare to make sure there are no overlaps
  let grouped = {};
  schedules.forEach((schedule) => {
    grouped[schedule.dow] = grouped[schedule.dow] || [];
    grouped[schedule.dow].push(schedule.toObject());
  });

  let startOfWeek = moment().startOf('isoweek'); // Monday (1);

  _.each(grouped, (dow) => {
    let baseDate = moment(startOfWeek).add(dow[0].dow -1, 'days');

    let has24 = false;
    let hasRange = false;
    let ranges = [];

    dow.forEach((schedule) => {
      if(_.has(schedule, 'is_24') && !_.isUndefined(schedule.is_24)) {
        // have more than 1 - 24 hour, error
        if(has24) {
          this.invalidate('is_24', 'More than 1 24 hour');
          valid = false;
        }
        has24 = true;
      }
      if(schedule.opened_at || schedule.closed_at) {
        hasRange = true;

        let openPieces = schedule.opened_at.split(":");
        let closedPieces = schedule.closed_at.split(":");

        let open =  moment(baseDate).hours(openPieces[0]).minutes(openPieces[1]);
        let close = moment(baseDate).hours(closedPieces[0]).minutes(closedPieces[1]);
        ranges.push(moment.range(open, close));
      }
    });

    if(ranges.length > 1) {

      while(ranges.length > 1) {
        let range = ranges.pop();

        // compare this to the list of our other ranges to check for overlaps
        ranges.map((compareRange) => {
          if(range.overlaps(compareRange)) {
            this.invalidate('schedules', 'overlapping range issues');
            valid = false;
          }
        });
      }

      // @TODO - could check overlaps across days since we could set hours that overlap across days

    }

    // can't have a 24 hour slot and a non-24 slot
    if(has24 && hasRange) {
      this.invalidate('is_24', '24 hour slot and non-24 slot');
      valid = false;
    }

  });

  // if a timeslot for a given day overlaps any other time slots on the same day
  return valid;
});

export default mongoose.model('Site', Site);
