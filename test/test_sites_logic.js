var chai = require('chai');
var expect = require('chai').expect;
var should = chai.should();
import * as logic from '../lib/logic.js';


describe('logic', function() {
  describe('isValueNull', function() {
    it('should return true if value is null, else false', function() {
      expect(logic.isValueNull('')).to.equal(true);
      expect(logic.isValueNull([])).to.equal(true);
      expect(logic.isValueNull('hello')).to.equal(false);
      expect(logic.isValueNull([1,2,3])).to.equal(false);
    });
  });
  describe('stringArrayBuilder', function() {
    it('should clean/format an array of strings', function() {
      let foo = logic.stringArrayBuilder([" nick ", " mattEi"]);
      let bar = ["NICK","MATTEI"];
      JSON.stringify(foo).should.equal(JSON.stringify(bar));
    });
  });
  describe('isTzFormatted', function() {
    it('should return true if the timezone is correct', function() {
      let bar = logic.isTzFormatted('ast'),
          foo = logic.isTzFormatted('zsc');
      foo.should.equal(false);
      bar.should.equal(true);
    });
  });
  describe('checkOverlap', function() {
    it('check for overlapping times', function() {
      let first = {open: '0000', close: '0800'};
      let second = {open: '0500', close: '1700'};
      let third = {open: '0900', close: '2400'};
      logic.checkOverlap([first, second]).should.equal(true);
      logic.checkOverlap([first, third]).should.equal(false);
    });
  });
  describe('sortItems', function() {
    it('sort timeslots from earliest to latest', function() {
      var one = {open: '0000', close: '0800'};
      var two = {open: '0900', close: '1200'};
      var three = {open: '1300', close: '1800'};
      var output = JSON.stringify([one, two, three]);
      var input = JSON.stringify(logic.sortItems([three, two, one]));
      input.should.equal(output);
    });
  });
  describe('validateBody', function() {
    it('should validate request body, and return the object', function() {
      var goodInput = logic.validateBody('CREATE', demoWrite);
      var badInput = logic.validateBody('CREATE', demoInvalid);
      expect(goodInput).to.be.a('object');
      expect(goodInput.msg).to.equal('SUCCESS');
      expect(goodInput.isValid).to.equal(true);
      expect(badInput).to.be.a('object');
      expect(badInput.isValid).to.equal(false);
    });
  });
});






// Sample Data:
var demoWrite = {
	"name": "DEMO WRITE",
	"street": "Rt 22",
	"city": "Plainfield",
	"state": "NJ",
	"timezone": "est",
	"phone": "9084547682",
	"email": "guidos@gtl.com",
	"primaryContactName": "Tony Soprano",
	"otherContacts": ["Scott", "Harry", "Aaron", "Keith"],
	"lastUpdated": "",
	"observedHolidays": ["Christmas", "New Years Eve", "Kwanzamakkah"],
	"schedule": {
		"sunday": {
			"isOpenAllDay": false,
			"hours": [{"open": "0000","close":"0700"}, {"open": "0800","close":"1800"}]
		},
		"monday": {
			"isOpenAllDay": false,
			"hours": [{"open": "0000","close":"0200"}, {"open": "0800","close":"1800"}]
		},
		"tuesday": {
			"isOpenAllDay": true,
			"hours": []
		},
		"wednesday": {
			"isOpenAllDay": true,
			"hours": [{"open": "0800", "close": "1700"}]
		},
		"thursday": {
			"isOpenAllDay": true,
			"hours": [{"open": "0000","close":"0200"}, {"open": "0800","close":"1800"}]
		},
		"friday": {
			"isOpenAllDay": true,
			"hours": [{"open": "0000","close":"0200"}, {"open": "0730","close":"1430"}]
		},
		"saturday": {
			"isOpenAllDay": true,
			"hours": []
		}
	}
};

var demoInvalid = {
	"name": "PLAIN OLD INVALID",
	"street": "519",
	"city": "Plainfield",
	"state": "NJ",
	"timezone": "est",
	"phone": "9084547682",
	"email": "guidos@gtl.com",
	"primaryContactName": "Tony Soprano",
	"otherContacts": ["Scott", "Harry", "Aaron", "Keith"],
	"lastUpdated": "",
	"observedHolidays": ["Christmas", "New Years Eve", "Kwanzamakkah"],
	"schedule": {
		"sunday": {
			"isOpenAllDay": false,
			"hours": [{"open": "0000","close":"1000"}, {"open": "0800","close":"1800"}]
		},
		"monday": {
			"isOpenAllDay": false,
			"hours": [{"open": "0000","close":"0200"}, {"open": "0800","close":"1800"}]
		},
		"tuesday": {
			"isOpenAllDay": true,
			"hours": []
		},
		"wednesday": {
			"isOpenAllDay": true,
			"hours": [{"open": "0800", "close": "1700"}]
		},
		"thursday": {
			"isOpenAllDay": true,
			"hours": [{"open": "0000","close":"0200"}, {"open": "0800","close":"1800"}]
		},
		"friday": {
			"isOpenAllDay": true,
			"hours": [{"open": "0000","close":"0200"}, {"open": "0730","close":"1430"}]
		},
		"saturday": {
			"isOpenAllDay": true,
			"hours": []
		}
	}
};
