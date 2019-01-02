const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');
const randomstring = require('randomstring');
const Schema = mongoose.Schema
mongoose.connect('mongodb://dang:dang@ds255715.mlab.com:55715/rockon',{ useNewUrlParser: true });



const app = express();


var polls = new Schema({

    _id:String,
    username:String,
    userId:String,
    title:String,
    options:[],
    vote:[],
    voted:[]

  });

  
var Polls = mongoose.model('polls',polls);


app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


app.get('/',async (req,res) => {
    
  let allPolls= await Polls.find({});
  res.send(allPolls);
});


app.get('/:name',async (req,res) => {

    
    let userPolls = await Polls.find({username:req.params.name});
    res.send(userPolls);
});


app.get('/poll/:id',async (req,res) => {

    let pollDetails =  await Polls.find({_id:req.params.id});
    res.send(pollDetails);
});


const checkJwt = jwt({

    secret:jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:`https://omersayem.auth0.com/.well-known/jwks.json`
    }),

    audience: 'qN5OL1JWi37phLJCtkoBQC4BCGnFs04q',
    issuer: `https://omersayem.auth0.com/`,
    algorithms:['RS256']
})


app.post('/',checkJwt,(req,res) => {

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


app.post('/poll/:id',checkJwt,async(req,res) => {
    
    const {vote,voted} = req.body;
    let pollDetails =  await Polls.findByIdAndUpdate({_id:req.params.id},{

        vote,
        voted
        
    });
    res.send(pollDetails);
});


app.delete('/delete/:id',async(req,res) => {
    
     await Polls.findByIdAndRemove({_id:req.params.id});
     res.status(200).send(); 
});




app.listen(8081,() => {

    console.log("listening on port 8081");
})