// BOARD API TESTS

let request = require('supertest');
let chai = require('chai')
let mongoose = require('mongoose');
let should = chai.should();


module.exports = function (app, options) {

    describe('BOARD API TEST', function () {

        describe('POST /api/boards - Board creation', function () {

            it('should send back a CREATED response - Board creation', function (done) {
                request(app)
                    .post('/api/boards')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: "BoardName",
                        prefs: {
                            background: "#000000"
                        }
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("BoardName");
                        res.body.prefs.background.should.equal("#000000");
                        res.body.memberships.should.be.instanceof(Array).and.have.length(1);
                        options.board = res.body;
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Board creation with no valid token', function (done) {
                request(app)
                    .post('/api/boards')
                    .set('Content-Type', 'application/json')
                    .send({
                        name: "BoardName",
                        color: "#000000"
                    })
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Board creation with no name', function (done) {
                request(app)
                    .post('/api/boards')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: ""
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Board creation with invalid color format', function (done) {
                request(app)
                    .post('/api/boards')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: "BoardName",
                        prefs: {
                            background : "#00000"
                        }
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('GET /api/boards/:id - Board read', function () {

            it('should send back a OK response - Board got', function (done) {
                request(app)
                    .get('/api/boards/' + options.board._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("BoardName");
                        res.body.prefs.background.should.equal("#000000");
                        res.body.memberships.should.be.instanceof(Array).and.have.length(1);
                        done();
                    });
            });

            it('should send back a NOT_FOUND response - Wrong board id', function (done) {
                request(app)
                    .get('/api/boards/' + 'wR0ngB04rd1D')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Wrong token', function (done) {
                request(app)
                    .get('/api/boards/' + 'wR0ngB04rd1D')
                    .set('Authorization', 'Bearer ' + '56s4dvsd68v6dsv7ds8v419d6fs8v4sd')
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('POST /api/boards/:id/lists - Create a list for the board', function () {

            it('should send back a CREATE response - List created', function (done) {
                request(app)
                    .post('/api/boards/' + options.board._id + '/lists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: "ListName",
                        pos : 123
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("ListName");
                        res.body.pos.should.equal(123);
                        res.body.idBoard.should.be.equal(options.board._id);
                        options.list = res.body;
                        done();
                    });
            });

            it('should send back a CREATE response - Send with additional fake field, the created object don\'t have it', function (done) {
                request(app)
                    .post('/api/boards/' + options.board._id + '/lists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        name: "ListName2",
                        pos : 123,
                        idBoard: 'toto',
                        foo: 'bar'
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("ListName2");
                        res.body.pos.should.equal(123);
                        res.body.should.not.have.property('foo');
                        res.body.should.have.property('name');
                        res.body.idBoard.should.be.equal(options.board._id);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Name missing', function (done) {
                request(app)
                    .post('/api/boards/' + options.board._id + '/lists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        pos : 123
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - pos missing', function (done) {
                request(app)
                    .post('/api/boards/' + options.board._id + '/lists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        name : "ListName3"
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });


        describe('GET /api/boards/:id/lists - GET lists for the board', function () {

            it('should send back a OK response - Lists got', function (done) {
                request(app)
                    .get('/api/boards/' + options.board._id + '/lists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(2);
                        done();
                    });
            });
        });

        describe('GET /api/boards/:id/lists - GET lists for the board with name "ListName"', function () {

            it('should send back a OK response - Lists got', function (done) {
                request(app)
                    .get('/api/boards/' + options.board._id + '/lists?name=ListName')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(1);
                        done();
                    });
            });
        });


    });

}