// import { Request, Response } from 'express';
// import * as Jwt from 'jsonwebtoken';
// import { User } from '../interfaces';
// import userControler from '../services/users.service';

// export default async function postUser(req: Request, res: Response) {
//   const user: User = req.body;
//   await userControler(user);
//   const token = Jwt.sign({ user }, process.env.JWT_SECRET as string);

//   return res.status(201).json({ token });
// }
