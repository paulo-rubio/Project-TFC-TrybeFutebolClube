import { Router } from 'express';
import { authMiddleware } from '../Middleware/ValidateToken';
import validateUser from '../Middleware/ValidateUser';
import UsersControler from '../controllers/userController';
// import Validate from '../Middleware/ValidateUser';
// import ValidateUser from '../middleware/schemaUsers';

const loginRouter = Router();

loginRouter.post('/', validateUser, (req, res) => UsersControler.loginControler(req, res));
loginRouter.get('/validate', authMiddleware, (req, res) => UsersControler.getLogin(req, res));

export default loginRouter;
