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
                        "idBoard" : options.list.idBoard,
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
                        "idBoard" : options.list.idBoard,
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
                        "idBoard" : options.list.idBoard,
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

        describe('GET /api/boards/:id/lists?cards=open - Get lists of the board with cards', function () {

            it('should send back a OK response - Lists with cards successfully got', function (done) {
                request(app)
                    .get('/api/boards/' + options.board._id + '/lists?cards=open')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(3);
                        res.body[0].cards.should.exist.and.be.instanceof(Array).and.have.length(2);
                        done();
                    });
            });
            it('should send back a OK response - Lists without cards successfully got', function (done) {
                request(app)
                    .get('/api/boards/' + options.board._id + '/lists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(3);
                        (res.body[0].cards === null).should.be.true;
                        done();
                    });
            });

        });

        describe('POST /api/cards/:id/checklists - Create a checklist for the card', function () {

            it('should send back a CREATE response - Checklist created successfully', function (done) {
                request(app)
                    .post('/api/cards/' + options.card._id + '/checklists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        "pos": 123456789,
                        "name": "MyCheckList"
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.be.equals("MyCheckList");
                        res.body.idCard.should.be.equals( options.card._id );
                        res.body.pos.should.be.equals(123456789);
                        res.body.idBoard.should.be.equals( options.card.idBoard);
                        options.checklist = res.body;
                        done();
                    });
            });

            it('should send back a CREATE response - Checklist created successfully by a another member', function (done) {
                request(app)
                    .post('/api/cards/' + options.card._id + '/checklists')
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .send({
                        "pos": 123456789,
                        "name": "MyCheckList"
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.be.equals("MyCheckList");
                        res.body.idCard.should.be.equals( options.card._id );
                        res.body.pos.should.be.equals(123456789);
                        res.body.idBoard.should.be.equals( options.card.idBoard);
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - Name or pos missing', function (done) {
                request(app)
                    .post('/api/cards/' + options.card._id + '/checklists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        "idBoard": options.card.idBoard,
                        "pos": 123456789
                    })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a NOT FOUND response - Invalid card ID', function (done) {
                request(app)
                    .post('/api/cards/' + options.card._id + '78/checklists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        "idBoard": options.card.idBoard,
                        "pos": 123456789
                    })
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Checklist created by a unauthorized member', function (done) {
                request(app)
                    .post('/api/cards/' + options.card._id + '/checklists')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .send({
                        "pos": 123456789,
                        "name": "MyCheckList"
                    })
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - No token given', function (done) {
                request(app)
                    .post('/api/cards/' + options.card._id + '/checklists')
                    .set('Content-Type', 'application/json')
                    .send({
                        "idBoard": options.card.idBoard,
                        "pos": 123456789
                    })
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('GET /api/cards/:id/checklists - Get all checklists for the card', function () {

            it('should send back a OK response - Checklist got successfully', function (done) {
                request(app)
                    .get('/api/cards/' + options.card._id + '/checklists')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(2);
                        done();
                    });
            });

            it('should send back a OK response - Checklist got successfully by another member', function (done) {
                request(app)
                    .get('/api/cards/' + options.card._id + '/checklists')
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(2);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Checklist get by unauthorized member', function (done) {
                request(app)
                    .get('/api/cards/' + options.card._id + '/checklists')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Checklist got by unauthenticated user', function (done) {
                request(app)
                    .get('/api/cards/' + options.card._id + '/checklists')
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a NOT FOUND response - Checklist got by unauthenticated user', function (done) {
                request(app)
                    .get('/api/cards/' + options.card._id + '45/checklists')
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });


    });
}