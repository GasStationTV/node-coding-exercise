import moment from 'moment';
import moment_timezone from 'moment-timezone';
import express from 'express';
import Sites from '../models/index.js'
import * as db from '../lib/logic';
var router = express.Router();

/*=== SITES INDEX ===*/
router.get('/', function(req,res,next) {
    db.getAllSites().then(function (sites) {
      res.json(sites)
      // res.render('sites', {sites: sites})
    });
});

/*=== New Site Form ===*/
router.get('/new', function (req,res,next) {
  res.render('new_site')
});

/*=== CREATE A SITE AND SCHEDULE ===*/
router.post('/new', function (req,res,next) {
  console.log(req.body);
  var result = db.validateBody('CREATE', req.body);
    if(result.isValid){
      db.createSiteAndSchedule(result.body).then(function (site) {
        console.log(site)
        res.redirect('/')
      })
    } else {
        res.render('new_site', {siteData: req.body, errorMsg: result.msg})
    }
});

/*=== PATCH and update partial data ===*/
// currenty with single object argument, otherwise make sure
// the argument list in formatted for multiple field updates
router.patch('/:id', function(req,res,next){
  db.patchSite(req.params.id, req.body).then(function (site) {
    res.json(site);
  })
});


router.post('/tv', function(req,res,next){
  var newEntry = new Site(req.body);
  newEntry.save(function(err){
    if(err) throw err;
    console.log('WORKED')
  })
})



/*=== Another way of using Mongoose to create ===*/
// router.post('/:id', function (req, res, next) {
//     new Site()
//     .setUp(req.params.id, req.body)
//     .save()
//     .then(() => { res.redirect('/') })
//     .then(null, () => /* error */ })
// })



module.exports = router;
