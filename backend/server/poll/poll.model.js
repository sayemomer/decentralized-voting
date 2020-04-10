const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var polls = new Schema({
	username: String,
	userId: String,
	title: String,
	options: [],
	vote: [],
	voted: [],
});

var Polls = mongoose.model('polls', polls);

module.exports = Polls;
