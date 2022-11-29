import { Router } from 'express';
import { authMiddleware } from '../Middleware/Validate';
import matchesControler from '../controllers/matchesControler';
// import { authMiddleware } from '../Middleware/Validate';

const matchesRouter = Router();

matchesRouter.get('/matches', (req, res) => matchesControler.getMatchers(req, res));

matchesRouter.post(
  '/matches',
  (req, res, next) => authMiddleware(req, res, next),
  (req, res) => matchesControler.postMatches(req, res),
);
// matchesRouter.patch('/:id/finish', (req, res) => matchesControler.patchMatches(req, res));

export default matchesRouter;
