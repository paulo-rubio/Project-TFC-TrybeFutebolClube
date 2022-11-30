import IMatches from '../Interfaces/InterfaceForMatches/Imatches';
import ILeaderBord, { IGameBoard } from '../Interfaces/InterfaceForLB/ILeaderBorder';

const calcForResult = (homeGoals: number, awayGoals:number) => {
  const resultGame = {
    win: 0,
    draw: 1,
    defeaf: 0,
    points: 1,
  };
  if (homeGoals > awayGoals) {
    resultGame.points = 3; resultGame.win = 1; resultGame.draw = 0;
  }
  if (awayGoals > homeGoals) {
    resultGame.points = 0; resultGame.defeaf = 1; resultGame.draw = 0;
  }
  if (awayGoals === homeGoals) {
    resultGame.points = 1; resultGame.draw = 1;
  }

  return resultGame;
};

const leader = (homeGoals: number, awayGoals: number): IGameBoard => {
  const gameResult = calcForResult(homeGoals, awayGoals);

  const result = {
    totalPoints: gameResult.points,
    totalGames: 1,
    totalVictories: gameResult.win,
    totalDraws: gameResult.draw,
    totalLosses: gameResult.defeaf,
    goalsFavor: homeGoals,
    goalsOwn: awayGoals,
    goalsBalance: homeGoals - awayGoals,
    efficiency: ((gameResult.points / (1 * 3)) * 100).toFixed(2),
  };

  return result;
};

const update = (team: ILeaderBord, game: IGameBoard): ILeaderBord => {
  const totalGames = team.totalGames + 1;
  const totalPoints = team.totalPoints + game.totalPoints;
  const result = {
    name: team.name,
    totalPoints,
    totalGames,
    totalVictories: team.totalVictories + game.totalVictories,
    totalDraws: team.totalDraws + game.totalDraws,
    totalLosses: team.totalLosses + game.totalLosses,
    goalsFavor: team.goalsFavor + game.goalsFavor,
    goalsOwn: team.goalsOwn + game.goalsOwn,
    goalsBalance: team.goalsBalance + game.goalsBalance,
    efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
  };
  return result;
};

const homeLeaderBorder = (matches: IMatches[]): ILeaderBord[] => {
  const table: ILeaderBord[] = [];
  matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome }) => {
    const teamIndexInName = table.findIndex((e) => e.name === teamHome.teamName);
    const data = leader(homeTeamGoals, awayTeamGoals);

    if (teamIndexInName < 0) {
      table.push({ name: teamHome.teamName, ...data });
    } else {
      table[teamIndexInName] = update(table[teamIndexInName], data);
    }
  });

  return table;
};

const awayLeaderBorder = (matches: IMatches[]): ILeaderBord[] => {
  const table: ILeaderBord[] = [];
  matches.forEach(({ homeTeamGoals, awayTeamGoals, teamAway }) => {
    const teamIndexInName = table.findIndex((e) => e.name === teamAway.teamName);
    const data = leader(awayTeamGoals, homeTeamGoals);

    if (teamIndexInName < 0) {
      table.push({ name: teamAway.teamName, ...data });
    } else {
      table[teamIndexInName] = update(table[teamIndexInName], data);
    }
  });

  return table;
};

const order = (border: ILeaderBord[]): ILeaderBord[] => {
  const newBorder:ILeaderBord[] = border;
  newBorder.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn
  ));
  return newBorder;
};

export default { homeLeaderBorder, awayLeaderBorder, order };
