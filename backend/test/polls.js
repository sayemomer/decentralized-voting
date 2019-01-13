let mongoose = require("mongoose");
let Poll = require('../server/model/Polls');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Polls', () => {

    // beforeEach((done) => { //Before each test we empty the database
    //     Poll.deleteMany({}, (err) => { 
    //        done();           
    //     });        
    // });
/*
  * Test the /GET route
  */
  describe('/GET polls', () => {
      it('it should GET all the polls', (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });


  describe('/Post poll', () => {
    it('it should POST a poll ', (done) => {
        let poll = {

            _id:'ahfhdbkfjdnks',
            username:'dashbd',
            userId:'dasjdas',
            title:'abc',
            options:['a','b'],
            vote:[1,1],
            voted:[]
        
          }
      chai.request(server)
          .post('/')
          .send(poll)
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

});

});