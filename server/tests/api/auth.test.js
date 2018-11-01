// BOARD API TESTS


let request = require('supertest');
let chai = require('chai')
let mongoose = require('mongoose');
let should = chai.should();

module.exports = function (app, options) {

    describe('AUTH API TEST', function () {

        describe('POST /api/signup', function () {

            it('should send back a OK response', function (done) {
                request(app)
                    .post('/api/signup')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'JohnP',
                        lastName: 'Peter',
                        firstName: 'John',
                        password: '1234',
                        email: 'john.peter@mail.com'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response (invalid email field)', function (done) {
                request(app)
                    .post('/api/signup')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'JohnP',
                        lastName: 'Peter',
                        firstName: 'John',
                        password: '1234',
                        email: 'johnpetermail.com'
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response (user already registered)', function (done) {
                request(app)
                    .post('/api/signup')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'JohnP',
                        lastName: 'Peter',
                        firstName: 'John',
                        password: '1234',
                        email: 'john.peter@mail.com'
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('POST /api/login', function () {

            it('should send back a OK response (successful login)', function (done) {
                request(app)
                    .post('/api/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'JohnP',
                        password: '1234'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.member.should.exist;
                        res.body.member.should.not.have.key('hash');
                        res.body.member.should.not.have.key('salt');
                        res.body.token.should.exist;
                        options.token = res.body.token;
                        options.member = res.body.member;
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response (failed login - wrong password)', function (done) {
                request(app)
                    .post('/api/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'JohnP',
                        password: '12834'
                    })
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response (failed login - wrong username)', function (done) {
                request(app)
                    .post('/api/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'John',
                        password: '1234'
                    })
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });
}