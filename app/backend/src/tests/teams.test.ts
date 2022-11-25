import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import teams from './mocks/teams';
import App from '../app'
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teams as Team[]);
    sinon
      .stub(Team, "findOne")
      .resolves(teams[0] as Team);
  });


  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findOne as sinon.SinonStub).restore();

  })

  it('pegando todos os teams', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams)
  });
  it('pegando por um id expecifico de teams', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams[0])
  });

});

