// import IType from '../Interfaces/InterfaceForUser/IType';
// import Iteams from '../Interfaces/InterfaceForTeams/ITeams';
import leaderBorder from '../utils/leaderborder';
import matchesService from './matches.service';

const leaderBorderService = async () => {
  const matches = await matchesService.getMatches('false');
  const leaderboard = leaderBorder.allLeaderBorder(matches);
  const orderLeaderBorder = leaderBorder.order(leaderboard);
  return orderLeaderBorder;
};

const leaderBorderAwayService = async () => {
  const matches = await matchesService.getMatches('false');
  const leaderboard = leaderBorder.awayLeaderBorder(matches);
  const orderLeaderBorder = leaderBorder.order(leaderboard);
  return orderLeaderBorder;
};

const leaderBorderHomeService = async () => {
  const matches = await matchesService.getMatches('false');
  const leaderboard = leaderBorder.homeLeaderBorder(matches);
  const orderLeaderBorder = leaderBorder.order(leaderboard);
  return orderLeaderBorder;
};

export default { leaderBorderService, leaderBorderHomeService, leaderBorderAwayService };
