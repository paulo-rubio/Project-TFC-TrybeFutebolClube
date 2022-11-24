import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';
export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;
  const data = jwt.verify(token as string, secret) as jwt.JwtPayload;

  // if (!token) {
  //   return res.status(401).json({ message: 'Token not found' });
  // }

  req.body.user = data.userId;
  next();
}

export const createToken = (id: number) => jwt.sign({
  data: { id },
}, secret, { algorithm: 'HS256' });
