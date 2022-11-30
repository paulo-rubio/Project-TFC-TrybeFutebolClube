import { Router } from 'express';
import LBControler from '../controllers/LBControler';

const LBRouter = Router();

LBRouter
  .get(
    '/leaderboard/',
    (req, res) => LBControler.getLeaderBorder(req, res),
  );

LBRouter
  .get(
    '/leaderboard/home',
    (req, res) => LBControler.getLeaderBorderHome(req, res),
  );

LBRouter
  .get(
    '/leaderboard/away',
    (req, res) => LBControler.getLeaderBorderAway(req, res),
  );

export default LBRouter;
