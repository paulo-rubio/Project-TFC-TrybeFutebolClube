import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}
MatchModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  homeTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,

}, {
  underscored: true,
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchModel;
