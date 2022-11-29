import { Router } from 'express';
import validateUser, { authMiddleware } from '../Middleware/Validate';
import UsersControler from '../controllers/userController';

const loginRouter = Router();

loginRouter.post(
  '/login',
  (req, res, next) => validateUser(req, res, next),
  (req, res) => UsersControler.loginControler(req, res),
);
loginRouter.get(
  '/login/validate',
  (req, res, next) => authMiddleware(req, res, next),
  (req, res) => UsersControler.getLogin(req, res),
);

export default loginRouter;
