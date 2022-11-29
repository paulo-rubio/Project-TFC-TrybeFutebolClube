import { Router } from 'express';
import matchesControler from '../controllers/matchesControler';
import { authMiddleware } from '../Middleware/Validate';

// import Validate from '../Middleware/ValidateUser';
// import ValidateUser from '../middleware/schemaUsers';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesControler.getMatchers(req, res));
matchesRouter.use(authMiddleware);
matchesRouter.post('/', (req, res) => matchesControler.postMatches(req, res));
// matchesRouter.patch('/:id/finish', (req, res) => matchesControler.patchMatches(req, res));

export default matchesRouter;
