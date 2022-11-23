import { Router } from 'express';
import usersRouter from './user.router';

const router = Router();

router.use('/login', usersRouter);

export default router;
