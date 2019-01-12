const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/Db');
require('dotenv').load();
const mongoose = require('mongoose');
const PollRouter = require('./route/PollRoute');
const port = process.env.PORT;
mongoose.connect(config.DB,{ useNewUrlParser: true }).then(
    () => {console.log('Database is connected')},
    err => { console.log('Database connection error'+ err)}
);

const app = express();

let Polls = require('./model/Polls');

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


app.use(PollRouter);


app.listen(port,() => {

    console.log("listening on port "+port);
})