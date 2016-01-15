riot.tag2('times_added', '<section> <h2>Sunday</h2> <input type="button" value="expand" onclick="{expand}"> <div class="container hidden"> <div each="{item, i in sunday}" onclick="{select_item}" data-_id="{i}"> <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="1"></time_form> </div> <div> <time_form id="time_form" submit_callback="{time_added}" day="1"></time_form> </div> <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="1"> <input type="button" value="close" onclick="{close}"> </div> </section> <section> <h2>Monday</h2> <input type="button" value="expand" onclick="{expand}"> <div class="container hidden"> <div each="{item, i in monday}" onclick="{select_item}" data-_id="{i}"> <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="2"></time_form> </div> <div> <time_form id="time_form" submit_callback="{time_added}" day="2"></time_form> </div> <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="2"> <input type="button" value="close" onclick="{close}"> </div> </section> <section> <h2>Tuesday</h2> <input type="button" value="expand" onclick="{expand}"> <div class="container hidden"> <div each="{item, i in tuesday}" onclick="{select_item}" data-_id="{i}"> <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="3"></time_form> </div> <div> <time_form id="time_form" submit_callback="{time_added}" day="3"></time_form> </div> <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="3"> <input type="button" value="close" onclick="{close}"> </div> </section> <section> <h2>Wednesday</h2> <input type="button" value="expand" onclick="{expand}"> <div class="container hidden"> <div each="{item, i in wednesday}" onclick="{select_item}" data-_id="{i}"> <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="4"></time_form> </div> <div> <time_form id="time_form" submit_callback="{time_added}" day="4"></time_form> </div> <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="4"> <input type="button" value="close" onclick="{close}"> </div> </section> <section> <h2>Thursday</h2> <input type="button" value="expand" onclick="{expand}"> <div class="container hidden"> <div each="{item, i in thursday}" onclick="{select_item}" data-_id="{i}"> <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="5"></time_form> </div> <div> <time_form id="time_form" submit_callback="{time_added}" day="5"></time_form> </div> <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="5"> <input type="button" value="close" onclick="{close}"> </div> </section> <section> <h2>Friday</h2> <input type="button" value="expand" onclick="{expand}"> <div class="container hidden"> <div each="{item, i in friday}" onclick="{select_item}" data-_id="{i}"> <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="6"></time_form> </div> <div> <time_form id="time_form" submit_callback="{time_added}" day="6"></time_form> </div> <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="6"> <input type="button" value="close" onclick="{close}"> </div> </section> <section> <h2>Saturday</h2> <input type="button" value="expand" onclick="{expand}"> <div class="container hidden"> <div each="{item, i in saturday}" onclick="{select_item}" data-_id="{i}"> <time_form submit_callback="{time_edited}" delete_callback="{time_deleted}" _id="{item._id}" time_start="{item.time_start}" time_end="{item.time_end}" is_24="{item.is_24}" day="7"></time_form> </div> <div> <time_form id="time_form" submit_callback="{time_added}" day="7"></time_form> </div> <input type="button" value="Open 24hrs" onclick="{time_added_24}" data-day="7"> <input type="button" value="close" onclick="{close}"> </div> </section>', 'times_added h2,[riot-tag="times_added"] h2{ margin-bottom:0; } times_added .hidden,[riot-tag="times_added"] .hidden{ display: none; }', '', function(opts) {
"use strict";

var _this = this;

var self = this;
var owner_id = 1;
this.times = [];

this.expand = function (event) {
    var container = event.target.parentNode.querySelector('.container');
    event.target.classList.add('hidden');
    container.classList.remove('hidden');
};
this.close = function (event) {
    var container = event.target.parentNode;
    container.classList.add('hidden');
    event.target.parentNode.parentNode.querySelector('input.hidden').classList.remove('hidden');
};

function validate_day(day, times, value_start, value_end) {
    var my_array = times.find(function (time) {
        if (time.day !== day && (time.value_start > value_end && time.value_start < value_start || time.value_end > value_end && time.value_end < value_start)) return time.day !== day && (time.value_start > value_end && time.value_start < value_start || time.value_end > value_end && time.value_end < value_start) ? true : false;
    });
    return !my_array || my_array.length == 0 ? true : false;
}

this.process_response = function (event) {
    if (event.target.readyState == 4 && event.target.status == 200) {
        var response = JSON.parse(event.target.responseText);
        if (response.error) {
            alert('Cannot add/update time: ' + response.error);
        } else {
                _this.get_times(owner_id);
            }
    }
};

this.time_added_24 = function (event) {
    var xmlHttp = new XMLHttpRequest();
    var day = event.target.dataset.day;
    var value = undefined,
        is_valid = undefined,
        day_name = undefined;
    switch (day) {
        case "1":
            value = 0;day_name = 'sunday';
            break;
        case "2":
            value = 48;day_name = 'monday';
            break;
        case "3":
            value = 96;day_name = 'tuesday';
            break;
        case "4":
            value = 144;day_name = 'wednesday';
            break;
        case "5":
            value = 192;day_name = 'thursday';
            break;
        case "6":
            value = 240;day_name = 'friday';
            break;
        default:
            value = 288;day_name = 'saturday';
    }
    if (validate_day(day, _this.times, value, value + 48)) {
        _this[day_name].forEach(function (time) {
            _this.time_deleted(time);
        });

        setTimeout(function () {
            xmlHttp.onreadystatechange = _this.process_response;
            xmlHttp.open("POST", "/owners/" + owner_id + "/times/");
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify({ time_start: null,
                time_end: null,
                day: day,
                is_24: true,
                value_start: value,
                value_end: value + 48,
                _id: null }));
        }, 500);
    } else {
        alert('Unable to Create/Update: there is at least one overlapping time slot');
    }
};
this.time_added = function (form) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = _this.process_response;
    xmlHttp.open("POST", "/owners/" + owner_id + "/times/");
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(form));
};
this.time_edited = function (form) {
    form.owner_id = owner_id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = _this.process_response;
    xmlHttp.open("PUT", "/times/" + form._id);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(form));
};
this.time_deleted = function (form) {
    form.owner_id = owner_id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = _this.process_response;

    xmlHttp.open("DELETE", "/times/" + form._id);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(form));
};

this.seperate_days = function (times) {
    _this.sunday = _this.times.filter(function (time) {
        return time.day === "1" ? true : false;
    });
    _this.monday = _this.times.filter(function (time) {
        return time.day === "2" ? true : false;
    });
    _this.tuesday = _this.times.filter(function (time) {
        return time.day === "3" ? true : false;
    });
    _this.wednesday = _this.times.filter(function (time) {
        return time.day === "4" ? true : false;
    });
    _this.thursday = _this.times.filter(function (time) {
        return time.day === "5" ? true : false;
    });
    _this.friday = _this.times.filter(function (time) {
        return time.day === "6" ? true : false;
    });
    _this.saturday = _this.times.filter(function (time) {
        return time.day === "7" ? true : false;
    });
};

this.get_times = function (owner_id) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (xmlHttp.responseText) {
                _this.times = JSON.parse(xmlHttp.responseText).times;
                _this.seperate_days(_this.times);
            } else {
                _this.times = [];
            }
            _this.update();
        }
    };
    xmlHttp.open("GET", "/owners/" + owner_id + "/times/", true);
    xmlHttp.send();
};
self.on('mount', function () {
    this.get_times(owner_id);
});
}, '{ }');