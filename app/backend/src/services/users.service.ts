import * as bcrypt from 'bcryptjs';
import IType from '../Interfaces/IType';
import ILogin from '../Interfaces/iLogin';
import UserModel from '../database/models/UserModel';
import IUser from '../Interfaces/Iuser';
import { createToken } from '../Middleware/ValidateToken';

const postLogin = async (user: ILogin): Promise<IType> => {
  const log = await UserModel.findOne({ where: { email: user.email } }) as unknown as IUser;

  if (!log.email || !user.password) {
    return { type: 400, message: 'All fields must be filled' };
  }
  if (log.password.length < 6) {
    return { type: 400, message: 'Password must be at least 6 characters long' };
  }
  const crypt = await bcrypt.compare(log.password, user.password);
  if (!crypt) return { type: 401, message: 'Incorrect email or password' };

  const token = createToken(log.id);
  return { type: 200, message: token };
};

const getLogin = async (id: number): Promise<{ role: string }> => {
  const user = await UserModel.findOne({ where: { id } }) as unknown as IUser;
  return { role: user.role };
};

export default { postLogin, getLogin };
