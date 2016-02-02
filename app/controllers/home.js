'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TimeSlot = mongoose.model('TimeSlot'),
  moment = require('moment');



function getOpenTimeDropDownList(time){
  var increment = 30;
  var momentTime = moment("12:00 AM", ["h:mm A"]);
  var result = '<option>--Select Time--</option><option>' + momentTime.format("h:mm A") + '</option>';
  var counter = 47;


  for (var i=0; i < counter; i++){
    var val = momentTime.add(increment, "minutes").format("h:mm A");
    var selected = '';

    if (val === time){
      selected = 'selected';
    }

    result = result + '<option value="' + val + '">' + val + '</option>';
  }


  return result;

}

function getCloseTimeDropDownList(time){
  var increment = 30;
  var momentTime = moment("12:30 AM", ["h:mm A"]);
  var result = '<option>--Select Time--</option><option>' + momentTime.format("h:mm A") + '</option>';
  var counter = 60;


  for (var i=0; i < counter; i++){
    var val = momentTime.add(increment, "minutes").format("h:mm A");
    var extraMessage = '';
    var selected = '';

    if (val === time){
      selected = 'selected';
    }

    if (i > 45){
      extraMessage = ' (next day)';
    }

    result = result + '<option value="' + val + '">' + val + extraMessage + '</option>';
  }




  return result;

}

function castDateValue(date){
  var result;
  if (isNaN(date)){
    result = moment(date);
  }
  else{
    result = moment(parseInt(date));
  }

  return result;
}

function getWeeklyTimeSlotData(siteId, date, callback){
  var query = TimeSlot.findOne({ 'siteId': parseInt(siteId), 'dateTime': date.valueOf()});

  query.select('openTimes closeTimes timeSlotCount');

  query.exec(function (err, timeSlot) {
    if (err) {
      callback(err);
    }
    else{
      callback(null, timeSlot);
    }

  });
}

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Welcome'
  });

});

router.post('/view', function (req, res, next) {

  var siteId = req.body.siteid;
  var date = castDateValue(req.body.date);

  var begin = moment(date).startOf('isoweek').isoWeekday(1);
  var main = "";

  getWeeklyTimeSlotData(siteId, date, function(err, timeSlot){
    if (err){
      return next(err);
    }
    else{

      var hiddenFields = '';

      if (timeSlot){

        for (var i=0; i<7; i++) {
            hiddenFields = '<input type="hidden" name="siteid" value="' + siteId + '"><input type="hidden" name="date" value="' + begin.valueOf() + '">';

            main += '<div><h3>' + begin.format('ddd D-M-Y') + '</h3><div>';

            if (begin.valueOf() === date.valueOf()){
              for (var j=0; j < timeSlot.timeSlotCount; j++){
                var openTime = timeSlot.openTimes[j];
                var closeTime = timeSlot.closeTimes[j];


                main += '<div><span>Open Time: </span>' + openTime + '</div>';
                main += '<div><span>Close Time: </span>' + closeTime + '</div>';
                main += '<form action="/edit" method="post">' + hiddenFields;
                main += '<input type="submit" value="Edit Site Hours"></form>';
              }
            }
            else{
              main += '<span>Closed</span>';
              main += '<form action="/edit" method="post">' + hiddenFields;
              main += '<input type="submit" value="Edit Site Hours"></form>';
            }


            begin.add('d', 1);
        }

      }
      else{
        hiddenFields = '<input type="hidden" name="siteid" value="' + siteId + '"><input type="hidden" name="date" value="' + date.valueOf() + '">';
        main += "There are no site hours for site id: " + siteId + "</br>";
        main += '<form action="/edit" method="post">' + hiddenFields;
        main += '<input type="submit" value="Create Site Hours"></form>';
      }


      res.render('viewonly', {
        title: 'View Weekly Site Hours',
        siteid: siteId,
        main: main
      });
    }
  });



});

router.post('/edit', function (req, res, next) {

  var siteId = req.body.siteid;
  var date = castDateValue(req.body.date);
  var begin = moment(date).startOf('isoweek').isoWeekday(1);

  var main = "";

  getWeeklyTimeSlotData(siteId, date, function(err, timeSlot){
    if (err){
      return next(err);
    }
    else{

      var hiddenFields = '';

      if (timeSlot){

        for (var i=0; i<7; i++) {

          hiddenFields = '<input type="hidden" name="siteid" value="' + siteId + '"><input type="hidden" name="date" value="' + begin.valueOf() + '">';

          main += '<div><h3>' + begin.format('ddd D-M-Y') + '</h3><div>';

          if (begin.valueOf() === date.valueOf()) {

            for (var j=0; j < timeSlot.timeSlotCount; j++){
              var openTime = timeSlot.openTimes[j];
              var closeTime = timeSlot.closeTimes[j];


              main += '<div><span>Open Time: </span><select>' + getOpenTimeDropDownList(openTime) + '</select></div>';
              main += '<div><span>Close Time: </span><select>' + getCloseTimeDropDownList(closeTime) + '</select></div>';
            }



          }

          main += '<span><form action="/add" method="post">' + hiddenFields;
          main += '<input type="submit" value="Add"></form></span>';

          main += '<span><form action="/delete" method="post">' + hiddenFields;
          main += '<input type="submit" value="Delete"></form></span>';

          main += '<span><form action="/24hours" method="post">' + hiddenFields;
          main += '<input type="submit" value="Make 24 hours"></form></span>';

          begin.add('d', 1);

        }

      }
      else{



        for (var j=0; j<7; j++) {
          hiddenFields = '<input type="hidden" name="siteid" value="' + siteId + '"><input type="hidden" name="date" value="' + begin.valueOf() + '">';

          main += '<div><h3>' + begin.format('ddd D-M-Y') + '</h3><div>';

          main += '<span><form action="/add" method="post">' + hiddenFields;
          main += '<input type="submit" value="Add"></form></span>';

          main += '<span><form action="/24hours" method="post">' + hiddenFields;
          main += '<input type="submit" value="Make 24 hours"></form></span>';

          begin.add('d', 1);
        }

      }

      res.render('edit', {
        title: 'Edit Weekly Site Hours',
        siteid: siteId,
        main: main
      });
    }
  });


});

router.post('/delete', function (req, res, next) {
  res.render('success', {
    title: 'You successfully deleted the time slot',
    date: req.body.date,
    siteid: req.body.siteid
  });

});

router.post('/24hours', function (req, res, next) {
  res.render('success', {
    title: 'You successfully set to 24 hours',
    date: req.body.date,
    siteid: req.body.siteid
  });

});

router.post('/update', function (req, res, next) {
  res.render('success', {
    title: 'You successfully updated the time slot',
    date: req.body.date,
    siteid: req.body.siteid
  });

});

router.post('/add', function (req, res, next) {

  var siteId = parseInt(req.body.siteid);
  var date = parseInt(req.body.date);


  TimeSlot.findOne({siteId: siteId, dateTime:date},function(err,result){
    var newTimeSlot = '';
    var successResponseObject = {
      title: 'You successfully added a time slot',
      date: req.body.date,
      siteid: req.body.siteid
    };

    if (err){
      console.log(err);
    }
    else{
      if(result!=null){
        result.timeSlotCount = result.timeSlotCount + 1;
        TimeSlot.update({siteId: siteId, dateTime:date},result,{upsert:true},function(err){
          if (err){
            console.log(err);
          }
          else{
            res.render('success', successResponseObject);
          }

        });
      }
      else{
        newTimeSlot = new TimeSlot({ siteId: siteId, dateTime:date, openTimes:[], closeTimes:[], timeSlotCount: 1,isTwentFourHours: false });
        newTimeSlot.save(function(err){
          if (err){
            console.log(err);
          }
          else{
            res.render('success', successResponseObject);
          }
        });
      }
    }


  });

});



