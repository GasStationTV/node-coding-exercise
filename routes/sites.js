import moment from 'moment';
import moment_timezone from 'moment-timezone';
import express from 'express';
import * as db from '../lib/logic';
var router = express.Router();


/*=== SITES INDEX ===*/
router.get('/', function(req,res,next) {
  db.getAllSites().then(function (sites) {
    res.json(sites);
  });
});


/*=== CREATE A SITE AND SCHEDULE ===*/
router.post('/', function (req,res,next) {
  var result = db.validateBody('CREATE', req.body);
  if(result.isValid){
    db.createSiteAndSchedule(result.body).then(function (site) {
      res.json({MSG: 'WRITE SUCCESSFUL', BODY: site});
    });
  }
  if(!result.isValid){
    res.json({ERROR: result.msg, BODY: result.body});
  }
});


/*=== Get One Site ===*/
router.get('/:id', function(req,res,next){
  db.getSite(req.params.id).then(function (site) {
    res.json(site);
  });
});


/*=== PATCH and update partial data ===*/
router.patch('/:id', function(req,res,next){
  db.patchSite(req.params.id, req.body).then(function (site) {
    res.json(site);
  });
});


/*=== Update Document -- Default ===*/
router.put('/:id/', function(req,res,next){
  var result = db.validateBody('UPDATE', req.body);
  if(result.isValid){
    db.updateDocument(req.params.id, result.body).then(function (site) {
      res.json({MSG: 'UPDATE SUCCESSFUL', BODY: site});
    });
  }
  if(!result.isValid){
    res.json({ERROR: result.msg, BODY: result.body});
  }
});


/*=== Delete Site ===*/
router.delete('/:id', function(req,res,next){
  db.deleteSite(req.params.id).then(function () {
    res.json({OK: "SITE DELETED"});
  });
});


module.exports = router;
