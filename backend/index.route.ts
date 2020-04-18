import * as express from 'express';
import pollRoutes from './server/poll/poll.route';

const router = express.Router();

router.use('/polls',pollRoutes);

export default router;