riot.tag2('time_form', '<form onsubmit="{submit_form}"> <select id="time_start{opts._id}" class="{is_24 ? \'hidden\' : \'\'}"> <option value="0"></option> <option value="1">12:00 AM</option> <option value="2">12:30 AM</option> <option value="3">1:00 AM</option> <option value="4">1:30 AM</option> <option value="5">2:00 AM</option> <option value="6">2:30 AM</option> <option value="7">3:00 AM</option> <option value="8">3:30 AM</option> <option value="9">4:00 AM</option> <option value="10">4:30 AM</option> <option value="11">5:00 AM</option> <option value="12">5:30 AM</option> <option value="13">6:00 AM</option> <option value="14">6:30 AM</option> <option value="15">7:00 AM</option> <option value="16">7:30 AM</option> <option value="17">8:00 AM</option> <option value="18">8:30 AM</option> <option value="19">9:00 AM</option> <option value="20">9:30 AM</option> <option value="21">10:00 AM</option> <option value="22">10:30 AM</option> <option value="23">11:00 AM</option> <option value="24">11:30 AM</option> <option value="25">12:00 PM</option> <option value="26">12:30 PM</option> <option value="27">1:00 PM</option> <option value="28">1:30 PM</option> <option value="29">2:00 PM</option> <option value="30">2:30 PM</option> <option value="31">3:00 PM</option> <option value="32">3:30 PM</option> <option value="33">4:00 PM</option> <option value="34">4:30 PM</option> <option value="35">5:00 PM</option> <option value="36">5:30 PM</option> <option value="37">6:00 PM</option> <option value="38">6:30 PM</option> <option value="39">7:00 PM</option> <option value="40">7:30 PM</option> <option value="41">8:00 PM</option> <option value="42">8:30 PM</option> <option value="43">9:00 PM</option> <option value="44">9:30 PM</option> <option value="45">10:00 PM</option> <option value="46">10:30 PM</option> <option value="47">11:00 PM</option> <option value="48">11:30 PM</option> </select> <select id="time_end{opts._id}" class="{is_24 ? \'hidden\' : \'\'}"> <option value="0"></option> <option value="2">12:30 AM</option> <option value="3">1:00 AM</option> <option value="4">1:30 AM</option> <option value="5">2:00 AM</option> <option value="6">2:30 AM</option> <option value="7">3:00 AM</option> <option value="8">3:30 AM</option> <option value="9">4:00 AM</option> <option value="10">4:30 AM</option> <option value="11">5:00 AM</option> <option value="12">5:30 AM</option> <option value="13">6:00 AM</option> <option value="14">6:30 AM</option> <option value="15">7:00 AM</option> <option value="16">7:30 AM</option> <option value="17">8:00 AM</option> <option value="18">8:30 AM</option> <option value="19">9:00 AM</option> <option value="20">9:30 AM</option> <option value="21">10:00 AM</option> <option value="22">10:30 AM</option> <option value="23">11:00 AM</option> <option value="24">11:30 AM</option> <option value="25">12:00 PM</option> <option value="26">12:30 PM</option> <option value="27">1:00 PM</option> <option value="28">1:30 PM</option> <option value="29">2:00 PM</option> <option value="30">2:30 PM</option> <option value="31">3:00 PM</option> <option value="32">3:30 PM</option> <option value="33">4:00 PM</option> <option value="34">4:30 PM</option> <option value="35">5:00 PM</option> <option value="36">5:30 PM</option> <option value="37">6:00 PM</option> <option value="38">6:30 PM</option> <option value="39">7:00 PM</option> <option value="40">7:30 PM</option> <option value="41">8:00 PM</option> <option value="42">8:30 PM</option> <option value="43">9:00 PM</option> <option value="44">9:30 PM</option> <option value="45">10:00 PM</option> <option value="46">10:30 PM</option> <option value="47">11:00 PM</option> <option value="48">11:30 PM</option> <option value="49">12:00 AM (next day)</option> <option value="50">12:30 AM (next day)</option> <option value="51">1:00 AM (next day)</option> <option value="52">1:30 AM (next day)</option> <option value="53">2:00 AM (next day)</option> <option value="54">2:30 AM (next day)</option> <option value="55">3:00 AM (next day)</option> <option value="56">3:30 AM (next day)</option> <option value="57">4:00 AM (next day)</option> <option value="58">4:30 AM (next day)</option> <option value="59">5:00 AM (next day)</option> <option value="60">5:30 AM (next day)</option> <option value="61">6:00 AM (next day)</option> </select> <span class="{is_24 ? \'hidden\' : \'\'}"> <input type="submit" value="{opts._id ? \'Edit\' : \'Add\'}"> </span> <span class="{!is_24 ? \'hidden\' : \'\'}"> Open 24hrs! </span> <input type="button" value="Remove" onclick="{delete_time}" class="{!opts._id ? \'hidden\' : \'\'}"> <div id="error_message" style="display: none;">Inputs incorrect.</div> </form>', 'time_form .hidden,[riot-tag="time_form"] .hidden{ display: none; }', '', function(opts) {
"use strict";

var _this = this;

var time_start = undefined;
var time_end = undefined;

var is_24_elem = undefined;
this.is_24 = this.opts.is_24 ? true : false;

function validate_form(time_start_value, time_end_value) {
    var message = undefined;
    if (time_start_value >= time_end_value) {
        message = 'Unable to Create/Update: The start time must be before the end time. ';
    }
    if (time_start_value === 0) {
        message += 'Unable to Create/Update: start time is required. ';
    }
    if (time_end_value === 0) {
        message += 'Unable to Create/Update: end time is required. ';
    }

    return message ? message : true;
}

this.submit_form = function (event) {
    var is_valid = undefined;
    event.preventDefault();
    is_valid = validate_form(parseInt(time_start.value), parseInt(time_end.value));
    if (is_valid === true) {
        _this.error_message.style.display = 'none';
        _this.opts.submit_callback(_this.calculate_time_value({ time_start: time_start.options[time_start.selectedIndex].value,
            time_end: time_end.options[time_end.selectedIndex].value,
            day: _this.opts.day,
            is_24: _this.is_24,
            _id: _this.opts._id }));
    } else {
        _this.error_message.style.display = 'block';
        _this.error_message.innerText = is_valid;
    }
};
this.checked_changed = function (event) {
    _this.is_24 = is_24_elem.checked;
    _this.update();
};
this.delete_time = function (event) {
    _this.opts.delete_callback({ time_start: time_start.selectedIndex != -1 ? time_start.options[time_start.selectedIndex].value : 1,
        time_end: time_end.selectedIndex != -1 ? time_end.options[time_end.selectedIndex].value : 1,
        day: _this.opts.day,
        is_24: _this.is_24,
        _id: _this.opts._id });
};
this.on('mount', function () {
    setTimeout(function () {
        if (_this.opts._id) {
            time_start = document.getElementById('time_start' + _this.opts._id);
            time_end = document.getElementById('time_end' + _this.opts._id);

            is_24_elem = document.getElementById('is_24_check' + _this.opts._id);
            time_start.value = _this.opts.time_start;
            time_end.value = _this.opts.time_end;
        } else {
                time_start = _this.time_start;
                time_end = _this.time_end;
            }
    }, 1);
});

this.calculate_time_value = function (time_to_add) {
    var value = 0,
        value_start = 0,
        value_end = 0;
    switch (time_to_add.day) {
        case "1":
            value = 0;
            break;
        case "2":
            value = 48;
            break;
        case "3":
            value = 96;
            break;
        case "4":
            value = 144;
            break;
        case "5":
            value = 192;
            break;
        case "6":
            value = 240;
            break;
        default:
            value = 288;
    }
    if (time_to_add.day === "7") {
        value_start = value + parseInt(time_to_add.time_start);
        if (parseInt(time_to_add.time_end) > 48) {
            value_end = parseInt(time_to_add.time_end);
        } else {
            value_end = value + parseInt(time_to_add.time_end);
        }
    } else {
        value_start = value + parseInt(time_to_add.time_start);
        value_end = value + parseInt(time_to_add.time_end);
    }
    time_to_add.value_start = value_start;
    time_to_add.value_end = value_end;
    return time_to_add;
};
}, '{ }');