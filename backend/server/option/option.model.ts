import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
	pollId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'poll'
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	vote: Number
}, { timestamps: true });


module.exports = mongoose.model('option', optionSchema);