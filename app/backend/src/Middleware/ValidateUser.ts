import { NextFunction, Request, Response } from 'express';

const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export default function validateUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!regex.test(email) || !email) {
    return res.status(400).json(
      { type: 401, message: 'Incorrect email or password' },
    );
  }
  if (!password) {
    return res.status(400).json(
      { type: 401, message: 'Incorrect email or password' },
    );
  }
  next();
}
