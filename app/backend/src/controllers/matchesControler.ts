import { Request, Response } from 'express';
import matchersService from '../services/matches.service';

const getMatchers = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matches = await matchersService.getMatches(inProgress as string);
  res.status(200).json(matches);
};

const postMatches = async (req: Request, res: Response) => {
  const { type, message, error } = await matchersService.postMatches(req.body);
  if (type) return res.status(error).json({ message });

  res.status(error).json(message);
};

const finishMatches = async (req:Request, res:Response) => {
  const { id } = req.params;
  await matchersService.finishMatches(Number(id));
  res.status(200).json({ message: 'Finished' });
};

const updateMatches = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  await matchersService.updateMatches(Number(id), { homeTeamGoals, awayTeamGoals });

  res.status(200).json({ message: 'Updated' });
};

export default {
  getMatchers,
  postMatches,
  finishMatches,
  updateMatches,
};
