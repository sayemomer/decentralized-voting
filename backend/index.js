const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').load();
const mongoose = require('mongoose');
Promise = require('bluebird');

const PollRouter = require('./server/poll/poll.route');
const port = process.env.PORT;

mongoose.Promise = Promise;
const mongoUri = 'mongodb://mongo:27017/voting';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUri, () => {}).then(()=>{
    console.log('mongodb is connected');
});

mongoose.connection.on('error', () => {
    console.log(`unable to connect to database: ${mongoUri}`)
});

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use(PollRouter);

app.listen(port, () => {
	console.log('listening on port ' + port);
});

module.exports = app;
