// MEMBERS API TESTS

let request = require('supertest');
let chai = require('chai')
let mongoose = require('mongoose');
let should = chai.should();


module.exports = function (app, options) {

    describe('MEMBERS API TEST', function () {

        describe('GET /api/members/:id - Get member\'s information', function () {

            it('should send back a OK response - Get with right member Id', function (done) {
                request(app)
                    .get('/api/members/' + options.member._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a NOT FOUND response - Get with wrong member Id', function (done) {
                request(app)
                    .get('/api/members/' + '5e21bc23d1a5622ez46rj356')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Get member with no token', function (done) {
                request(app)
                    .get('/api/members/' + options.member._id)
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });


        });


        describe('PUT /api/members/:id - Update member\'s information', function () {

            it('should send back a FORBIDDEN response - Member updated successfully', function (done) {
                request(app)
                    .put('/api/members/' + options.memberLambda._id + '?firstName=Bob&lastName=Terimik&organization=Sopra')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a OK response - Member updated successfully', function (done) {
                request(app)
                    .put('/api/members/' + options.memberLambda._id + '?firstName=Bob&lastName=Terimik&organization=Sopra')
                    .set('Authorization', 'Bearer ' + options.tokenLambda)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        request(app)
                            .get('/api/members/' + options.memberLambda._id)
                            .set('Authorization', 'Bearer ' + options.tokenLambda)
                            .set('Content-Type', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return done(err);
                                res.body.firstName.should.be.equals("Bob");
                                res.body.lastName.should.be.equals("Terimik");
                                res.body.organization.should.be.equals("Sopra");
                                done();
                            });
                    });
            });
        });

        describe('DELETE /api/members/:id - Delete a member', function () {

            it('should send back a FORBIDDEN response - Member deleted by another member', function (done) {
                request(app)
                    .delete('/api/members/' + options.memberLambda._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a OK response - Member deleted successfully', function (done) {
                request(app)
                    .delete('/api/members/' + options.memberLambda._id)
                    .set('Authorization', 'Bearer ' + options.tokenLambda)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        request(app)
                            .post('/api/login')
                            .set('Content-Type', 'application/json')
                            .send({
                                username: 'Arnold',
                                password: 'f45ze85e'
                            })
                            .expect(401)
                            .end(function (err, res) {
                                if (err) return done(err);
                                done();
                            });
                    });
            });

        });

        describe('GET /api/members/:id/boards - Get member\'s boards', function () {

            it('should send back a OK response - Get member\'s boards with right member Id', function (done) {
                request(app)
                    .get('/api/members/' + options.member._id + '/boards')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(1);
                        res.body[0].memberships[0].idMember.should.be.equal(options.member._id)
                        done();
                    });
            });

            it('should send back a NOT FOUND response - Get member\'s boards with wrong member Id', function (done) {
                request(app)
                    .get('/api/members/' + '5e21bc23d1a5622ez46rj356' + '/boards')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Get member\'s boards with no token', function (done) {
                request(app)
                    .get('/api/members/' + options.member._id + '/boards')
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('GET /api/members/search/:keywords - Get members by username', function () {

            it('should send back a OK response - Get members for the username given (Two user exists)', function (done) {
                request(app)
                    .get('/api/members/search/j')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(2);
                        done();
                    });
            });

            it('should send back a OK response - Get members for the username given (one user exist)', function (done) {
                request(app)
                    .get('/api/members/search/john')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(1);
                        done();
                    });
            });

            it('should send back a OK response - Get members for the username given (no users, empty list)', function (done) {
                request(app)
                    .get('/api/members/search/dfg')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(0);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Get members for the username given without token', function (done) {
                request(app)
                    .get('/api/members/search/dfg')
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });
};