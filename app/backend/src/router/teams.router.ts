import { Router } from 'express';
import teamsControler from '../controllers/teamsControler';

const teamsRouter = Router();

teamsRouter.get('/teams', (req, res) => teamsControler.getTeams(req, res));
teamsRouter.get('/teams/:id', (req, res) => teamsControler.getTeamId(req, res));

export default teamsRouter;
