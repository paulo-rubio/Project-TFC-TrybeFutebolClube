import { Router } from 'express';
import loginRouter from './login.router';
import matchesRouter from './matches.router';
import teamsRouter from './teams.router';
import LBRouter from './leaderBorder.router';

const router = Router();

router.use(loginRouter);
router.use(matchesRouter);
router.use(teamsRouter);
router.use(LBRouter);

export default router;
