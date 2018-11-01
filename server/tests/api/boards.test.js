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
                        color: "#000000"
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("BoardName");
                        res.body.color.should.equal("#000000");
                        res.body.creator.should.exist;
                        res.body.lists.should.be.instanceof(Array);
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
                        name: "",
                        color: "#000000"
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
                        color: "#00000"
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
                        res.body.color.should.equal("#000000");
                        res.body.creator.should.exist;
                        res.body.lists.should.be.instanceof(Array);
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


    });

}