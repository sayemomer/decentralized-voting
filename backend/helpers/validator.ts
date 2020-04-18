import Joi from '@hapi/joi';
import { Types } from 'mongoose';
import {  Request, Response, NextFunction } from 'express';


export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params'
}

export const joiObjectId = () => Joi.string().custom((value: string, helpers) => {
	if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid');
	return value;
}, 'Object Id Validation');

export const joiUrlEndpoint = () => Joi.string().custom((value: string,helpers)=>{
	if(value.includes('://')) return helpers.error('any.invalid');
	return value;
},'Url Enpoint Validation');


export default (schema: Joi.ObjectSchema,source: ValidationSource = ValidationSource.BODY) => (req: Request , res: Response , next: NextFunction) => {
	try {
		const {error} = schema.validate(req[source]);
		if(!error) return next();
		const { details } = error;
		const message = details.map(i => i.message.replace(/['"]+/g, '')).join(',');
		console.log(' hello ' + message);
		return res.send(message);
		// next();
		// Logger.error(message); //TODO create proper log
		// next(new BadRequestError(message));
	} catch (error) {
		next(error);
	}
};
