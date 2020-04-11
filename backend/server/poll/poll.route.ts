import * as express from 'express';
const router = express.Router();
import * as pollController from './poll.controller';

router.route('/').get(pollController.getAll).post(pollController.createPoll);
router.route('/:pollId').get(pollController.getPoll).delete(pollController.deletePoll);
router.route('/:userId').get(pollController.getByUserId);

export default router;