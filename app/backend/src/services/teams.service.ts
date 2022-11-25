import TeamModel from '../database/models/TeamModel';
// import IType from '../Interfaces/InterfaceForUser/IType';
import Iteams from '../Interfaces/InterfaceForTeams/ITeams';

const getTeams = async () => {
  const Teams = await TeamModel.findAll();

  return { type: false, message: Teams };
};

const getTeamId = async (id: number): Promise<Iteams> => {
  const Team = await TeamModel.findOne({ where: { id } }) as Iteams;
  console.log(Team, 'aaa');

  return Team;
};

export default {
  getTeams,
  getTeamId,
};
