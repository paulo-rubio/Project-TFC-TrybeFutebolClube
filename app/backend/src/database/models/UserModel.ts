import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}
User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  modelName: 'users',
  sequelize: db,
  timestamps: false,
});

export default User;
