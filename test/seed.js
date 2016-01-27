var demoGet = {
  "_id": "56a7fe30c8e9e00c20ff7d6f",
  "name": "LOAF N JUG",
  "street": "CHURCH ROAD",
  "city": "SLC",
  "state": "UT",
  "timezone": "MST",
  "phone": "9034647682",
  "email": "MILKE@GTL.COM",
  "primaryContactName": "TOPHER THE LOAFER",
  "__v": 0,
  "schedule": {
    "saturday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "friday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "thursday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "wednesday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "tuesday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "monday": {
      "isOpenAllDay": false,
      "hours": [
        {
          "open": "0000",
          "close": "0700"
        },
        {
          "open": "0800",
          "close": "1800"
        }
      ]
    },
    "sunday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    }
  },
  "observedHolidays": [
    "CHRISTMAS",
    "NEW YEARS EVE",
    "KWANZAMAKKAH",
    "APRIL FOOLS"
  ],
  "lastUpdated": "2016-01-26T23:16:00.523Z",
  "otherContacts": [
    "SCOTT",
    "HARRY",
    "AARON",
    "KEITH",
    "CHRIS"
  ]
};

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
			"isOpenAllDay": true,
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
			"hours": [{"open": "0000","close":"0900"}, {"open": "0800","close":"1800"}]
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

//Change Data
var demoPut = {
  "_id": "56a83229514185094aa72c77",
  "name": "LOAF N JUG",
  "street": "CHURCH ROAD",
  "city": "Salt Lake City",
  "state": "UT",
  "timezone": "MST",
  "phone": "9034647682",
  "email": "MILKE@GTL.COM",
  "primaryContactName": "TOPHER THE LOAFER",
  "__v": 0,
  "schedule": {
    "saturday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "friday": {
      "isOpenAllDay": false,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "thursday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "wednesday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "tuesday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    },
    "monday": {
      "isOpenAllDay": false,
      "hours": [
        {
          "open": "0000",
          "close": "0700"
        },
        {
          "open": "0800",
          "close": "1800"
        }
      ]
    },
    "sunday": {
      "isOpenAllDay": true,
      "hours": [
        {
          "open": "0000",
          "close": "2400"
        }
      ]
    }
  },
  "observedHolidays": [
    "CHRISTMAS",
    "NEW YEARS EVE",
    "KWANZAMAKKAH",
    "APRIL FOOLS"
  ],
  "lastUpdated": "2016-01-27T02:57:45.034Z",
  "otherContacts": [
    "SCOTT",
    "HARRY",
    "AARON",
    "KEITH",
    "CHRIS"
  ]
};



module.exports = demoPut;
module.exports = demoInvalid;
module.exports = demoWrite;
module.exports = demoGet;
