import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getTeams = async (_req: Request, res: Response) => {
  const { message } = await teamsService.getTeams();

  res.status(200).json(message);
};

const getTeamId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await teamsService.getTeamId(Number(id));

  console.log(data);

  res.status(200).json(data);
};

export default {
  getTeams,
  getTeamId,
};
