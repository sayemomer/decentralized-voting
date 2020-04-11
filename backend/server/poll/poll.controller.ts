import { Request, Response } from 'express';
import randomstring from 'randomstring';
let Polls = require('./poll.model');

export const getAll = async (req : Request, res : Response) => {
	try {
		let allPolls = await Polls.find({});
		res.status(200).send(allPolls);
	} catch (e) {
		console.log(e);
	}
};

export const getByUserId = async (req : Request, res : Response) => {
	try {
		let userPolls = await Polls.find({ username: req.params.name });
		res.status(200).send(userPolls);
	} catch (e) {
		console.log(e);
	}
};

export const getPoll = async (req : Request, res : Response ) => {
	try {
		let pollDetails = await Polls.find({ _id: req.params.id });
		res.status(200).send(pollDetails);
	} catch (e) {
		console.log(e);
	}
};

export const createPoll = async (req : Request, res : Response) => {
	try {
		const { username, title, options, vote, voted } = req.body;
		const newPoll = {
			username,
			userId: randomstring.generate(7),
			title,
			options,
			vote,
			voted,
		};
		var poll = new Polls(newPoll);
		const newCreatedPoll = await poll.save();
		res.status(201).send(newCreatedPoll);
	} catch (e) {
		console.log(e);
	}
};

export const deletePoll = async (req : Request, res : Response) => {
	try {
		await Polls.findByIdAndRemove({ _id: req.params.id });
		res.status(200).send();
	} catch (e) {
		console.log(e);
	}
};
