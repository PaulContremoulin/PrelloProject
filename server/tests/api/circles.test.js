// LIST API TESTS

let request = require('supertest');
let chai = require('chai')
let mongoose = require('mongoose');
let should = chai.should();


module.exports = function (app, options) {

    describe('CIRCLE API TEST', function () {

        describe('POST /api/members/:id/circles - Create a circle for the user', function () {

            it('should send back a CREATE response - Member can see the circle with his/her rights', function (done) {
                request(app)
                    .post('/api/members/' + options.member._id + '/circles?name=gestiondedroit')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("gestiondedroit");
                        res.body.idMember.should.equal(options.member._id);
                        options.member.circle = res.body;
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Member can see the circle withou name', function (done) {
                request(app)
                    .post('/api/members/' + options.member._id + '/circles')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Unauthorized member can\'t see another member\'s circles', function (done) {
                request(app)
                    .post('/api/members/' + options.member._id + '/circles')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Unauthorized unauthenticate member  can\'t see another member\'s circles', function (done) {
                request(app)
                    .post('/api/members/' + options.member._id + '/circles')
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('GET /api/members/:id/circles - Get circles for the user', function () {

            it('should send back a OK response - Member can see the circle with his/her rights', function (done) {
                request(app)
                    .get('/api/members/' + options.member._id + '/circles')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(1);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Member can\'t see circles of another user', function (done) {
                request(app)
                    .get('/api/members/' + options.member._id + '/circles')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Public user can\'t see circles of another user', function (done) {
                request(app)
                    .get('/api/members/' + options.member._id + '/circles')
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('GET /api/circles/:id - Get a circle by id', function () {
            it('should send back a OK response - Member can see the circle with his/her rights', function (done) {
                request(app)
                    .get('/api/circles/' + options.member.circle._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.idBoards.should.be.instanceof(Array).and.have.length(0);
                        done();
                    });
            });
            it('should send back a FORBIDDEN response - Another member can\'t see the circle of another user', function (done) {
                request(app)
                    .get('/api/circles/' + options.member.circle._id)
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should send back a UNAUTHORIZED response - Public member can\'t see the circle of a member', function (done) {
                request(app)
                    .get('/api/circles/' + options.member.circle._id)
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('POST /api/circles/:id/boards - Post a board into circle by id', function () {
            it('should send back a CREATED response - Member add a board to his circles', function (done) {
                request(app)
                    .post('/api/circles/' + options.member.circle._id + '/boards?idBoard=' + options.board._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.idBoards.should.be.instanceof(Array).and.have.length(1);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Board\'s id missing', function (done) {
                request(app)
                    .post('/api/circles/' + options.member.circle._id + '/boards')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Board\'s id wrong', function (done) {
                request(app)
                    .post('/api/circles/' + options.member.circle._id + '/boards?idBoard=z6af4azf46zaf')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('DELETE /api/circles/:id/boards /:idBoard - Delete a board into circle by id', function () {
            it('should send back a OK response - Board deleted', function (done) {
                request(app)
                    .delete('/api/circles/' + options.member.circle._id + '/boards/' + options.board._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        request(app)
                            .get('/api/circles/' + options.member.circle._id)
                            .set('Authorization', 'Bearer ' + options.token)
                            .set('Content-Type', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return done(err);
                                res.body.idBoards.should.be.instanceof(Array).and.have.length(0);
                                done();
                            });
                    });
            });
        });

        describe('DELETE /api/circles/:id - Delete a circle by id', function () {
            it('should send back a OK response - Circle deleted', function (done) {
                request(app)
                    .delete('/api/circles/' + options.member.circle._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        request(app)
                            .get('/api/members/' + options.member._id + '/circles')
                            .set('Authorization', 'Bearer ' + options.token)
                            .set('Content-Type', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return done(err);
                                res.body.should.be.instanceof(Array).and.have.length(0);
                                done();
                            });
                    });
            });
        });



    });
};