import Joi from '@hapi/joi';

export default {
	poll: Joi.object().keys({
		title: Joi.string().required().max(500),
		options: Joi.array().required().min(2).max(20)
	}),
};