import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import IType from '../Interfaces/InterfaceForUser/IType';
import ILogin from '../Interfaces/InterfaceForUser/iLogin';
import UserModel from '../database/models/UserModel';
import IUser from '../Interfaces/InterfaceForUser/Iuser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const postLogin = async (user: ILogin): Promise<IType> => {
  const log = await UserModel.findOne({ where: { email: user.email } }) as IUser;

  if (!log) {
    return { type: true, message: 'Incorrect email or password' };
  }
  const crypt = await bcrypt.compare(user.password, log.password);
  if (!crypt) return { type: true, message: 'Incorrect email or password' };

  const token = Jwt.sign(
    { userId: log.id },
    secret as string,
    {
      expiresIn: '3d',
    },
  );

  return { type: false, message: token };
};

const getLogin = async (id: number): Promise<{ role: string }> => {
  const user = await UserModel.findOne({ where: { id } }) as IUser;

  return { role: user.role };
};

export default { postLogin, getLogin };
