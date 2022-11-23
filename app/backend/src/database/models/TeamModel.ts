import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}
TeamModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  modelName: 'teams',
  sequelize: db,
  timestamps: false,
});

export default TeamModel;
