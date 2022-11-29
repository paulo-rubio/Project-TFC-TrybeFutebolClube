import { Router } from 'express';
import loginRouter from './login.router';
import matchesRouter from './matches.router';
import teamsRouter from './teams.router';

const router = Router();

router.use(loginRouter);
router.use(matchesRouter);
router.use(teamsRouter);

export default router;
