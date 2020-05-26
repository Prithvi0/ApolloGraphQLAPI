/** It comprises of test cases to pass the APIs for GraphQL server.
 * @description     -   Pass a Test case
 */
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = require('chai').expect;
const url = 'http://localhost:4000/';
const request = require('supergraphqltest')(url);
const fs = require("fs");

function readFile() {
    var readData = fs.readFileSync('./test/userData.json');
    var data = JSON.parse(readData);
    return data;
}

describe('Tests for User API', () => {

    describe('GraphQL', () => {
        it('given graphQL server when given port should get connected', (done) => {
            request.post('/graphql')
                .send(url)
                .expect(200)
            done()
        })

        it('given graphQL server when given query and passed a message should return welcome message', (done) => {
            request.post('/graphql')
                .send({ query: '{message}' })
                .expect('Welcome to Notes Application')
            done()
        })

        it.skip('given user when stored in database should return user by Id', (done) => {
            request.post('/graphql')
                .send({ query: readFile().getUserById })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(JSON.parse(res.text).data.getUserById.firstName).to.equals("shiva");
                    done();
                })
        })

        it.skip('given user when logged in correctly should return success message', (done) => {
            request.post('/graphql')
                .send({ query: readFile().login })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(JSON.parse(res.text).data.login.message).to.equals("Login successful");
                    done();
                })
        })

        it.skip('given user when registered correctly should return success message', (done) => {
            request.post('/graphql')
                .send({ query: readFile().register })
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(JSON.parse(res.text).data.register.message).to.equals("Registration Success!");
                    done();
                })
        })

        it('given user when forgot password should return token as e-mail', (done) => {
            request.post('/graphql')
                .send({ query: readFile().forgotPass })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(JSON.parse(res.text).data.forgotPass.message).to.equals("E-mail sent to change password.");
                    expect(JSON.parse(res.text).data.forgotPass.success).to.equals(true);
                    done();
                })
        })

        it.skip('given user when reset password should return token message', (done) => {
            request.post('/graphql')
                .send({ query: readFile().resetPass })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(JSON.parse(res.text).data.resetPass.message).to.equals("Password successfully resetted.");
                    expect(JSON.parse(res.text).data.resetPass.success).to.equals(true);
                    done();
                })
        })
    })
})