import { Request, Response } from 'express';
import { PollModel } from './poll.model';
import Option, { OptionModel } from '../option/option.model';


export const getAll = async (req: Request, res: Response) => {
	try {
		let allPolls = await PollModel.find({}).select('_id title options') .populate('options','name vote');
		res.status(200).send(allPolls);
	} catch (e) {
		console.log(e);
	}
};

export const getByUserId = async (req: Request, res: Response) => {
	try {
		let userPolls = await PollModel.find({ username: req.params.name });
		res.status(200).send(userPolls);
	} catch (e) {
		console.log(e);
	}
};

export const getPoll = async (req: Request, res: Response) => {
	try {
		let pollDetails = await PollModel.find({ _id: req.params.id });
		res.status(200).send(pollDetails);
	} catch (e) {
		console.log(e);
	}
};

export const createPoll = async (req: Request, res: Response) => {
	try {
		const { options } = req.body;

		const poll = new PollModel({ title: req.body.title });
		const newCreatedPoll = await poll.save();

		const optionsWithPoll = options.map((name: Option['name']) => {
			return {
				name,
				pollId: newCreatedPoll._id
			};
		});

		const option = await OptionModel.create(optionsWithPoll);
		const optionIds = option.map((option: Option) => option._id);
		const updatedPoll = await PollModel.findOneAndUpdate({ title: newCreatedPoll.title }, { options: optionIds }, { new: true });

		res.status(201).send(updatedPoll.toObject());
	} catch (e) {
		console.log(e);
	}
};

export const deletePoll = async (req: Request, res: Response) => {
	try {
		await PollModel.findByIdAndRemove({ _id: req.params.id });
		res.status(200).send();
	} catch (e) {
		console.log(e);
	}
};
