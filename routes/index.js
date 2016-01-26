// var express = require('express');
import express from 'express';
import * as db from '../lib/logic.js';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
var router = express.Router();
import {Sites} from '../models/index.js';

router.get('/', function(req, res, next) {

  res.render('index', {title: 'Gas Station TV!'})
});




module.exports = router;
