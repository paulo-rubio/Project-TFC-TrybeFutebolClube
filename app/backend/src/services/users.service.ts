import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
// import IsussesType from '../Interfaces/ISussessoType';
import IType from '../Interfaces/IType';
import ILogin from '../Interfaces/iLogin';
import UserModel from '../database/models/UserModel';
import IUser from '../Interfaces/Iuser';

const secret = 'jwt_secret';

const postLogin = async (user: ILogin): Promise<IType> => {
  const log = await UserModel.findOne({ where: { email: user.email } }) as unknown as IUser;

  if (!log.email || !user.password) {
    return { type: true, message: 'All fields must be filled' };
  }
  if (log.password.length < 6) {
    return { type: true, message: 'Password must be at least 6 characters long' };
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
  const user = await UserModel.findOne({ where: { id } }) as unknown as IUser;
  return { role: user.role };
};

export default { postLogin, getLogin };
