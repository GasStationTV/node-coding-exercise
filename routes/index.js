// var express = require('express');
import express from 'express';
import * as db from '../lib/logic.js';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
var router = express.Router();
import {Sites, Schedules, TimeSlot} from '../models/index.js';

router.get('/', function(req, res, next) {
  let obj = {
    site_name:'WaWa',
    address: "NJ",
    phone: 10123252498,
    timezone: 'EST',
    schedule: []
  }

  db.newSite(obj).then(function (site) {
    console.log('first')
    db.addScheduleToSite(site._id).then(function () {
      console.log('second')
      db.getSchedules(site._id).then(function (data) {
        console.log(data)
        res.render('index', { title: 'GSTV in Action' });
      })
    })
  })
});


router.get('/gstv', function(req,res,next){
  Schedules.findOne({_id: "56a195b123c3e67633a5f1df"}).then(function (obj) {
    res.render('index', { title: 'GSTV HOME'});
  })
})


module.exports = router;
