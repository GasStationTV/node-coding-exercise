// var express = require('express');
import express from 'express';

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Gas Station TV!'});
});

module.exports = router;
