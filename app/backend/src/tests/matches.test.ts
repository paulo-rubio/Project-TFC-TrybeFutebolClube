import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app'
import Match from '../database/models/matchesModel';
import matchers, { login } from './mocks/matches'
import { matchesWithInProgressIsFalse, matchesWithInProgressIsTrue, matches, newMatch, finishedMatch } from './mocks/matches'
import { Response } from 'superagent';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
describe('teste relacionado a teams', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('get in matches', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchers as unknown as Match[]);
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchers)
  });
  it('get in matches?inProgress=true', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchers as unknown as Match[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesWithInProgressIsTrue)
  });
  it('get in matches?inProgress=true', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchers as unknown as Match[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesWithInProgressIsFalse)
  });
  it('post in matches', async  () => {
    sinon.stub(UserModel, 'findOne').resolves(login[0] as UserModel)
    sinon.stub(Match, 'create').resolves(matchers[0] as unknown as Match)

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })

    const math =  await chai
    .request(app)
    .post('/matches')
    .set('Authorization', chaiHttpResponse.body.token)
    .send({
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
    })
    expect(math.status).to.be.equal(201);
    
  })
  it('error post in matches 422', async  () => {
    sinon.stub(UserModel, 'findOne').resolves(login[0] as UserModel)
    sinon.stub(Match, 'create').resolves(matchers[0] as unknown as Match)

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })

    const math =  await chai
    .request(app)
    .post('/matches')
    .set('Authorization', chaiHttpResponse.body.token)
    .send({
      homeTeam: 8,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
    })
    expect(math.status).to.be.equal(422);
    expect(math.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })
  it('error post in matches 404', async  () => {
    sinon.stub(UserModel, 'findOne').resolves(login[0] as UserModel)
    sinon.stub(Match, 'create').resolves(matchers[0] as unknown as Match)

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })

    const math =  await chai
    .request(app)
    .post('/matches')
    .set('Authorization', chaiHttpResponse.body.token)
    .send({
      homeTeam: 90,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 1,
    })
    expect(math.status).to.be.equal(404);
    expect(math.body).to.be.deep.equal({ message: 'There is no team with such id!' })
  })
  it('Finished', async  () => {
    sinon.stub(Match, 'update').resolves([1])

    const math =  await chai
    .request(app)
    .patch('/matches/2/finish')
    .send({
      homeTeamGoals: 3,
      awayTeamGoals: 2,
    })
    expect(math.status).to.be.equal(200);
    expect(math.body).to.be.deep.equal({ message: 'Finished' })
  })

  it('updated', async  () => {
    sinon.stub(Match, 'update').resolves([1])

    const math =  await chai
    .request(app)
    .patch('/matches/40')
    .send({
      homeTeamGoals: 90,
      awayTeamGoals: 20,
    })
    expect(math.status).to.be.equal(200);
    expect(math.body).to.be.deep.equal({ message: 'Updated' })
  })
});

