import TeamModel from '../database/models/TeamModel';
import Iteams from '../Interfaces/InterfaceForTeams/ITeams';

const getTeams = async () => {
  const Teams = await TeamModel.findAll();

  return { type: false, message: Teams };
};

const getTeamId = async (id: number): Promise<Iteams> => {
  const Team = await TeamModel.findOne({ where: { id } }) as Iteams;

  return Team;
};

export default {
  getTeams,
  getTeamId,
};
