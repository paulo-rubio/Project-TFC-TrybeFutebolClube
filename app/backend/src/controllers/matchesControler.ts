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
// const patchMatches = async (req:Request, res:Response) => {
//   const { id } = req.params;
//   const { type, message, error } = await matchersService.patchMatches(id);
//   if (type) return res.status(error).json({ message });

//   res.status(200).json(message);
// };

export default {
  getMatchers,
  postMatches,
  // patchMatches,
};
