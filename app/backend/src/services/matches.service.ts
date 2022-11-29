import IPostMatches from '../Interfaces/InterfaceForMatches/IPostMatches';
import { IError } from '../Interfaces/InterfaceForUser/IType';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/matchesModel';
import IMatches from '../Interfaces/InterfaceForMatches/Imatches';

const getMatches = async (query: string) => {
  const matches = await MatchModel.findAll({
    include: [{
      model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] },
    },
    {
      model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] },
    }],
  });
  if (query === 'false') {
    const data = matches.filter((matc) => !matc.inProgress);
    return data as unknown as IMatches[];
  }
  if (query === 'true') {
    const data = matches.filter((matc) => matc.inProgress);
    return data as unknown as IMatches[];
  }
  return matches as unknown as IMatches[];
};

const postMatches = async (newMatcher: IPostMatches): Promise<IError> => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatcher;
  const team = await TeamModel.findOne({ where: { id: homeTeam } });
  const away = await TeamModel.findOne({ where: { id: awayTeam } });
  if (!team || !away) {
    return {
      type: true, message: 'There is no team with such id!', error: 404,
    };
  }
  if (homeTeam === awayTeam) {
    return { type: true,
      message: 'It is not possible to create a match with two equal teams',
      error: 422,
    };
  }
  const createMatches = await MatchModel.create({
    homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
  });
  return { type: false, message: createMatches, error: 201 };
};

// const patchMatches = async (id: number): Promise<IError> => {

// };

export default {
  getMatches,
  postMatches,
  // patchMatches,
};
