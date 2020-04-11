import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
	}
}, { timestamps: true });


module.exports = mongoose.model('poll', pollSchema);

