import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default function validateUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
}

const secret = process.env.JWT_SECRET || 'jwt_secret';
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization: token } = req.headers;
    const data = jwt.verify(token as string, secret) as jwt.JwtPayload;
    // console.log(data);
    // return res.status(200).json(data);

    req.body.user = data.userId;
  } catch (_e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}

export const createToken = (id: number) => jwt.sign({
  data: { id },
}, secret, { algorithm: 'HS256' });
