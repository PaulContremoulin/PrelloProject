// BOARD API TESTS

let request = require('supertest');
let chai = require('chai')
let mongoose = require('mongoose');
let should = chai.should();


module.exports = function (app, options) {

    describe('CARD API TEST', function () {

        describe('POST /api/cards - Board creation', function () {

            it('should send back a CREATED response - Card created', function (done) {
                request(app)
                    .post('/api/cards')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        "idList" : options.list._id,
                        "pos" : 123456789
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.pos.should.equal(123456789);
                        res.body.idList.should.equal(options.list._id);
                        options.card = res.body;
                        done();
                    });
            });

            it('should send back a CREATED response - Card created by another member', function (done) {
                request(app)
                    .post('/api/cards')
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .send({
                        "idList" : options.list._id,
                        "pos" : 123456789,
                        "name" : "a another card"
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Card created with wrong access', function (done) {
                request(app)
                    .post('/api/cards')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .send({
                        "idList" : options.list._id,
                        "pos" : 123456789
                    })
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('POST /api/cards/idMembers/:id - Attach a member to the card', function () {

            it('should send back a OK response - Attach a authorized user to the board', function (done) {
                request(app)
                    .post('/api/cards/'+ options.card._id +'/idMembers?value='+options.memberFreinds._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Attach a unauthorized user to the board', function (done) {
                request(app)
                    .post('/api/cards/'+ options.card._id +'/idMembers?value='+options.memberUnauthorized._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        "idList": options.list._id,
                        "pos": 123456789
                    })
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });


        });

    });
}