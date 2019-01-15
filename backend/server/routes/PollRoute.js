const express = require('express');
const Router = express.Router();
const randomstring = require('randomstring');



let Polls = require('../model/Polls');

Router.get('/',async (req,res) => {
    
    let allPolls= await Polls.find({});
    res.send(allPolls);
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
      res.status(200).send(poll);
  });
  
  
Router.post('/poll/:id',checkJwt,async(req,res) => {
      
      const {vote,voted} = req.body;
      let poll =  await Polls.findByIdAndUpdate({_id:req.params.id},{
  
          vote,
          voted
          
      });
      res.status(200).send(poll);
  });
  
  
Router.delete('/delete/:id',async(req,res) => {
      
    let poll = await Polls.findByIdAndRemove({_id:req.params.id});
    res.status(200).send(poll); 
  });
  

module.exports = Router
  


