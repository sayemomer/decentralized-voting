import { Schema, model, Document } from 'mongoose';
import Poll from 'server/poll/poll.model';

export const DOCUMENT_NAME = 'Option';
export const COLLECTION_NAME = 'options';

export default interface Option extends Document {
	[x: string]: any;
	pollId: Poll
	name: string;
	vote?:Number;
}

const schema = new Schema({
	pollId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Poll'
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	vote: Number
}, { timestamps: true });

export const OptionModel = model<Option>(DOCUMENT_NAME, schema, COLLECTION_NAME);