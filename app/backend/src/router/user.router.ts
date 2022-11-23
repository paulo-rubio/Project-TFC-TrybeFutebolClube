import { Router } from 'express';
import UsersControler from '../controllers/userController';
// import Validate from '../Middleware/ValidateUser';
// import ValidateUser from '../middleware/schemaUsers';

const userRouter = Router();

userRouter.post('/', UsersControler);

export default userRouter;
