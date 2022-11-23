import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schemaUser = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().min(3).required(),
});

export default class Validate {
  static validationLogin(req: Request, res: Response, next: NextFunction) {
    const { error } = schemaUser.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  }
}
