import { Router } from 'express';
import matchesControler from '../controllers/matchesControler';

// import Validate from '../Middleware/ValidateUser';
// import ValidateUser from '../middleware/schemaUsers';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesControler.getMatchers(req, res));

export default matchesRouter;
