const express = require('express');
const Router = express.Router();
const randomstring = require('randomstring');



let Polls = require('../model/Polls');

Router.get('/',async (req,res) => {
    
    let allPolls= await Polls.find({});
    res.send(allPolls);
  });
  
  
  Router.get('/:name',async (req,res) => {
  
      
      let userPolls = await Polls.find({username:req.params.name});
      res.send(userPolls);
  });
  
  
  Router.get('/poll/:id',async (req,res) => {
  
      let pollDetails =  await Polls.find({_id:req.params.id});
      res.send(pollDetails);
  });

  const checkJwt = require('../auth/auth');
  
    Router.post('/',checkJwt,(req,res) => {
  
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
  
  
  Router.post('/poll/:id',checkJwt,async(req,res) => {
      
      const {vote,voted} = req.body;
      let pollDetails =  await Polls.findByIdAndUpdate({_id:req.params.id},{
  
          vote,
          voted
          
      });
      res.send(pollDetails);
  });
  
  
  Router.delete('/delete/:id',async(req,res) => {
      
       await Polls.findByIdAndRemove({_id:req.params.id});
       res.status(200).send(); 
  });
  

  module.exports = Router
  


