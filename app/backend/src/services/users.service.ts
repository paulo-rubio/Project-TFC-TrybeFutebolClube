import { validate } from 'email-validator';
import * as bcrypt from 'bcryptjs';
import IType from '../Interfaces/IType';
import User from '../database/models/UserModel';
import IUser from '../Interfaces/Iuser';
import { createToken } from '../Middleware/ValidateToken';

const valid = async (body: IUser): Promise<IType> => {
  if (!body.email || !body.password) {
    return { type: 400, message: 'All fields must be filled' };
  }
  if (body.password.length < 6) {
    return { type: 400, message: 'Password must be at least 6 characters long' };
  }
  const user = await User.findOne({ where: { email: body.email } });
  if (!user || !validate(body.email)) return { type: 401, message: 'Incorrect email or password' };

  const crypt = await bcrypt.compare(body.password, user.password);
  if (!crypt) return { type: 401, message: 'Incorrect email or password' };

  const token = createToken(user.id);
  return { type: 200, message: token };
};

export default valid;
