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

    });

}