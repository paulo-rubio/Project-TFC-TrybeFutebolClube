import { Request, Response } from 'express';
// import userControler from '../services/users.service';
import loginService from '../services/users.service';

const loginControler = async (req: Request, res: Response) => {
  const { type, message } = await loginService.postLogin(req.body);

  if (type) return res.status(401).json({ message });
  res.status(200).json({ token: message });
};

const getLogin = async (req: Request, res: Response) => {
  const id = req.body.user;
  console.log(id);

  const { role } = await loginService.getLogin(id);
  console.log(role);

  res.status(200).json(role);
};

export default { loginControler, getLogin };
