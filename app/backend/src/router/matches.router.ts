import { Router } from 'express';
import { authMiddleware } from '../Middleware/Validate';
import matchesControler from '../controllers/matchesControler';

const matchesRouter = Router();

matchesRouter.get('/matches', (req, res) => matchesControler.getMatchers(req, res));

matchesRouter.post(
  '/matches',
  (req, res, next) => authMiddleware(req, res, next),
  (req, res) => matchesControler.postMatches(req, res),
);

matchesRouter.patch('/matches/:id', (req, res) => matchesControler.updateMatches(req, res));
matchesRouter.patch('/matches/:id/finish', (req, res) => matchesControler.finishMatches(req, res));

export default matchesRouter;
