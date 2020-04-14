import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Poll';
export const COLLECTION_NAME = 'polls';

export default interface Poll extends Document {
	title: string;
}

const schema = new Schema(
	{
		title: {
			type: Schema.Types.String,
			required: true,
			maxlength: 500,
			trim: true
		},
		options: [{

			type: Schema.Types.ObjectId,
			ref: 'Option'

		}]
	},
	{
		timestamps: true
	});

export const PollModel = model<Poll>(DOCUMENT_NAME, schema, COLLECTION_NAME);