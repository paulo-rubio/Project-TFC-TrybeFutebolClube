import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import teams from './mocks/teams';
import App from '../app'
import Match from '../database/models/matchesModel';
import Login from '../database/models/UserModel'
import matchers from './mocks/matches'
import { matchesWithInProgressIsFalse, matchesWithInProgressIsTrue, matches, newMatch, finishedMatch } from './mocks/matches'
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
describe('teste relacionado a teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchers as unknown as Match[]);
    // sinon
    //   .stub(Team, "findOne")
    //   .resolves(teams[0] as Team);
  });


  // after(() => {
  //   (Team.findAll as sinon.SinonStub).restore();
  //   (Team.findOne as sinon.SinonStub).restore();
  // })


  it('get in matches', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchers)
  });
  it('get in matches?inProgress=true', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesWithInProgressIsTrue)
  });
  it('get in matches?inProgress=true', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesWithInProgressIsFalse)
  });


});

