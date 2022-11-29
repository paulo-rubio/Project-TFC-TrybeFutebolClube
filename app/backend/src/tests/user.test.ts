import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app'
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
describe('teste relacionado a Login', () => {
  let chaiHttpResponse: Response;

  it('!emain', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: '', password: 'secret_admin' })
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled" });
  });
  it('!password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '' })
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled" });
  });
  it('email incorreto', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@email.com', password: 'secret_admin' })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Incorrect email or password" });
  });
  it('senha incorreta', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'senha_seecreta' })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Incorrect email or password" });
  });

  it('testando corretamente toda a aplicação login', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
    expect(chaiHttpResponse.status).to.be.equal(200)

    const role = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', chaiHttpResponse.body.token)

    expect(role.status).to.be.equal(200)
    expect(role.body).to.be.deep.equal({ role: 'admin' })
  })
});
