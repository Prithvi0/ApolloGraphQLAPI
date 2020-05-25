const chai = require('chai');
const expect = require('chai').expect;
require('../config/databaseConfig');
require('dotenv').config();
const url = process.env.PORT;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('given graphQL server when given port should get connected', (done) => {
        request.post('/')
        .send(url)
        .expect(200)
            done();
          })
     })

describe('GraphQL', () => {
    it('given graphQL server when given query and passed a message should return welcome message', (done) => {
        request.post('/')
        .send({query:'{message}'})
        .expect('Welcome User!')
        done();
     })
})

describe('GraphQL', () => {
    it('given graphQL server when given mutation and passed register should return register', (done) => {
        request.post('/')
        .send({mutation:'{register(firstName: String!, lastName: String!, emailId: String!, password: String!)}'})
        .expect('Registration Success!')
        done();
     })
})

describe('GraphQL', () => {
    it('given graphQL server when given mutation and passed login should return login', (done) => {
        request.post('/')
        .send({mutation:'{login(emailId: String!, password: String!)}'})
        .expect('Login successful')
        done();
     })
})

describe('GraphQL', () => {
    it('given graphQL server when given mutation and passed forgotPass should return token e-mail', (done) => {
        request.post('/')
        .send({mutation:'{forgotPass(emailId: String!)}'})
        .expect('E-mail sent to change password.')
        done();
     })
})

describe('GraphQL', () => {
    it('given graphQL server when given mutation and passed resetPass should return new Pass', (done) => {
        request.post('/')
        .send({mutation:'{resetPass(newPass: String!, confirmPass: String!)}'})
        .expect('Password successfully updated.')
        done();
     })
})