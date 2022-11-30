// import IType from '../Interfaces/InterfaceForUser/IType';
// import Iteams from '../Interfaces/InterfaceForTeams/ITeams';
import homeLeaderBorder, { order } from '../utils/leaderborder';
import matchesService from './matches.service';

const leaderBorderService = async () => {
  const matches = await matchesService.getMatches('false');
  const leaderboard = homeLeaderBorder(matches);
  return leaderboard;
};

const leaderBorderHomeService = async () => {
  const matches = await matchesService.getMatches('false');
  const leaderboard = homeLeaderBorder(matches);
  const orderLeaderBorder = order(leaderboard);
  return orderLeaderBorder;
};

export default { leaderBorderService, leaderBorderHomeService };
