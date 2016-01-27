var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var should = chai.should();
var demoGet = require('./seed.js');
var demoWrite = require('./seed.js');
var demoInvalid = require('./seed.js');
var demoPut = require('./seed.js');
var server = require('../app');
chai.use(chaiHttp);

// var request = require('supertest');
// var mongoose = require('mongoose');
// var mockgoose = require('mockgoose');


describe('Site Routes', function() {
  it('should GET all sites @ /site', function (done) {
    chai.request(server)
    .get('/site/')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.a('object');
      done();
    });
  });
  it('should GET a site @ /site/:id', function (done) {
    chai.request(server)
    .get('/site/56a7fe30c8e9e00c20ff7d6f')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.a('object');
      expect(res.body._id).to.equal(demoGet._id);
      expect(res.body.city).to.equal(demoGet.city);
      done();
    });
  });
  it('should POST a new site to /site', function (done) {
    chai.request(server)
    .post('/site')
    .send(demoWrite)
    .end(function (err, res) {
      res.should.have.status(200);
      expect(res.body.MSG).to.equal('WRITE SUCCESSFUL');
      done();
    });
  });
  // Fix This
  // it('should POST an invalid site to /site', function (done) {
  //   chai.request(server)
  //   .post('/site')
  //   .send(demoInvalid)
  //   .end(function (err, res) {
  //     res.should.have.status(200);
  //     console.log(res.body);
  //     expect(res.body.ERROR).to.equal("sunday: Adjust Timeslots, HOURS OVERLAP.");
  //     done();
  //   });
  // });
  it('should PATCH a site @ /site/:id', function (done) {
    chai.request(server)
    .patch('/site/56a83229514185094aa72c77')
    .send({name: "NOT THE LOAF N JUG"})
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should PUT update to /site/:id', function (done) {
    chai.request(server)
    .put('/site/56a83229514185094aa72c77')
    .send(demoPut)
    .end(function (err, res) {
      res.should.have.status(200);
      expect(res.body.MSG).to.equal('UPDATE SUCCESSFUL');
      done();
    });
  });
  it('should DELETE a site /site/:id/', function (done) {
    //for now change ids
    chai.request(server)
    .delete('/site/56a827cd18c6d7e03beea520')
    .end(function (err, res) {
      res.should.have.status(200);
      expect(res.body.OK).to.equal("SITE DELETED");
      done();
    });
  });
});
