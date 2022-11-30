import { Request, Response } from 'express';
import LBService from '../services/lb.service';

const getLeaderBorder = async (req: Request, res: Response) => {
  const leaderboard = await LBService.leaderBorderService();
  res.status(200).json(leaderboard);
};

const getLeaderBorderHome = async (req: Request, res: Response) => {
  const leaderboard = await LBService.leaderBorderHomeService();
  res.status(200).json(leaderboard);
};

export default { getLeaderBorder, getLeaderBorderHome };
