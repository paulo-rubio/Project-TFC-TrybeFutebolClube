import { Request, Response } from 'express';
// import userControler from '../services/users.service';
import loginService from '../services/users.service';

const loginControler = async (req: Request, res: Response) => {
  const createLogin = await loginService.postLogin(req.body);
  res.status(200).json({ createLogin });
};

const getLogin = async (req: Request, res: Response) => {
  const id = req.body.user;
  const { role } = await loginService.getLogin(id);
  res.status(200).json({ role });
};

export default { loginControler, getLogin };
