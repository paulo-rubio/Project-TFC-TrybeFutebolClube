import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app'
import Match from '../database/models/matchesModel';
import allLeaderBorder from './mocks/leaderBorder/allLb';
import awayResult from './mocks/leaderBorder/away';
import homeResult from './mocks/leaderBorder/home';

import { matchesWithInProgressIsFalse } from './mocks/matches'
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
describe('teste relacionado a teams', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('get in /leaderboard', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsFalse as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).to.be.deep.equal(allLeaderBorder[0])
  });
  it('get in /leaderboard/home', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsFalse as unknown as Match[]);

    chaiHttpResponse = await chai
    
      .request(app)
      .get('/leaderboard/home')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).to.be.deep.equal(homeResult[0])
  });
  it('get in /leaderboard/away', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsFalse as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).to.be.deep.equal(awayResult[0])
  });


});

