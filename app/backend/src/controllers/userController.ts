import { Request, Response } from 'express';
// import userControler from '../services/users.service';
import loginService from '../services/users.service';

const loginControler = async (req: Request, res: Response) => {
  const createLogin = await loginService(req.body);
  res.status(200).json({ createLogin });
};

export default loginControler;
