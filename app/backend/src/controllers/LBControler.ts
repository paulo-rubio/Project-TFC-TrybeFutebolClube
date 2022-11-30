import { Request, Response } from 'express';
import lbService from '../services/lb.service';

const getLeaderBorder = async (_req: Request, res: Response) => {
  const leaderboard = await lbService.leaderBorderService();
  res.status(200).json(leaderboard);
};

const getLeaderBorderHome = async (_req: Request, res: Response) => {
  const leaderboard = await lbService.leaderBorderHomeService();
  res.status(200).json(leaderboard);
};

const getLeaderBorderAway = async (_req: Request, res: Response) => {
  const leaderboard = await lbService.leaderBorderAwayService();
  res.status(200).json(leaderboard);
};

export default { getLeaderBorder, getLeaderBorderHome, getLeaderBorderAway };
