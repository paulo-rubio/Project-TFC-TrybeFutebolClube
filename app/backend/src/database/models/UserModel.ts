import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}
UserModel.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  userName: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  tableName: 'users',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default UserModel;
