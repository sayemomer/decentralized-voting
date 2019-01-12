const express = require('express');
const app = express();
const Router = express.Router();
const randomstring = require('randomstring');
const checkJwt = require('../auth/auth');



let Polls = require('../model/Polls');

Router.route('/').get(async (req,res) => {
    
    let allPolls= await Polls.find({});
    res.send(allPolls);
  });
  
  
  Router.route('/:name').get(async (req,res) => {
  
      
      let userPolls = await Polls.find({username:req.params.name});
      res.send(userPolls);
  });
  
  
  Router.route('/poll/:id').get(async (req,res) => {
  
      let pollDetails =  await Polls.find({_id:req.params.id});
      res.send(pollDetails);
  });
  
    Router.route('/').post(checkJwt,(req,res) => {
  
      const {username,title,options,vote,voted} = req.body;
      const newPoll = {
          
          _id: randomstring.generate(7),
          username,
          userId:randomstring.generate(7),
          title,
          options,
          vote,
          voted
  
      };
      var poll = new Polls(newPoll);
      poll.save();
      res.status(200).send();
  });
  
  
  Router.route('/poll/:id').post(checkJwt,async(req,res) => {
      
      const {vote,voted} = req.body;
      let pollDetails =  await Polls.findByIdAndUpdate({_id:req.params.id},{
  
          vote,
          voted
          
      });
      res.send(pollDetails);
  });
  
  
  Router.route('/delete/:id').delete(async(req,res) => {
      
       await Polls.findByIdAndRemove({_id:req.params.id});
       res.status(200).send(); 
  });
  

  module.exports = Router
  


