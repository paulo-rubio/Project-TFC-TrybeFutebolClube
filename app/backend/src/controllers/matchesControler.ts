import { Request, Response } from 'express';
import matchersService from '../services/matches.service';

const getMatchers = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matches = await matchersService.getMatches(inProgress as string);
  res.status(200).json(matches);
};

// const postMatches = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const { type, message } = await matchersService.postMatches(id, req.body);

//   if (type) return res.status(401).json({ message });
//   res.status(200).json({ token: message });
// };

export default {
  getMatchers,
};
