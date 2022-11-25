import { Router } from 'express';
import teamsControler from '../controllers/teamsControler';
// import Validate from '../Middleware/ValidateUser';
// import ValidateUser from '../middleware/schemaUsers';

const loginRouter = Router();

loginRouter.get('/', (req, res) => teamsControler.getTeams(req, res));
loginRouter.get('/:id', (req, res) => teamsControler.getTeamId(req, res));

export default loginRouter;
