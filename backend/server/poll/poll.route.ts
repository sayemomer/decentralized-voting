import * as express from 'express';
const router = express.Router();
import * as pollController from './poll.controller';
import schema from './poll.validation';
import validator from '../../helpers/validator';

router.route('/').get(pollController.getAll).post(validator(schema.poll), pollController.createPoll);
router.route('/:pollId').get(pollController.getPoll).delete(pollController.deletePoll);
router.route('/:userId').get(pollController.getByUserId);

export default router;