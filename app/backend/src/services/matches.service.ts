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

// const postMatches = async (postMatcher): Promise<IType> => {
//   const ;
// };

export default {
  getMatches,
};
