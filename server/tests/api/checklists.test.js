// BOARD API TESTS

let request = require('supertest');
let chai = require('chai')
let mongoose = require('mongoose');
let should = chai.should();


module.exports = function (app, options) {

    describe('CHECKLIST API TEST', function () {

        describe('GET /api/checklists/:id - Get a checklist', function () {

            it('should send back a OK response - Checklist got', function (done) {
                request(app)
                    .get('/api/checklists/' + options.checklist._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal(options.checklist.name);
                        res.body.pos.should.equal(options.checklist.pos);
                        res.body.idBoard.should.equal(options.checklist.idBoard);
                        res.body.idCard.should.equal(options.checklist.idCard);
                        done();
                    });
            });

            it('should send back a OK response - Checklist got by another member of the board', function (done) {
                request(app)
                    .get('/api/checklists/' + options.checklist._id)
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal(options.checklist.name);
                        res.body.pos.should.equal(options.checklist.pos);
                        res.body.idBoard.should.equal(options.checklist.idBoard);
                        res.body.idCard.should.equal(options.checklist.idCard);
                        done();
                    });
            });

            it('should send back a NOT FOUND response - Checklist got with invalid id', function (done) {
                request(app)
                    .get('/api/checklists/789' + options.checklist._id)
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Checklist got by member that hasn\'t in the board', function (done) {
                request(app)
                    .get('/api/checklists/' + options.checklist._id)
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a UNAUTHORIZED response - Checklist got by unauthorized member', function (done) {
                request(app)
                    .get('/api/checklists/' + options.checklist._id)
                    .set('Content-Type', 'application/json')
                    .expect(401)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('PUT /api/checklists/:id - Update a checklist', function () {

            it('should send back a OK response - Checklist updated', function (done) {
                request(app)
                    .put('/api/checklists/' + options.checklist._id + '?name=modifiedName&pos=124555')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("modifiedName");
                        res.body.pos.should.equal(124555);
                        res.body.idBoard._id.should.equal(options.checklist.idBoard);
                        res.body.idCard.should.equal(options.checklist.idCard);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Checklist updated', function (done) {
                request(app)
                    .put('/api/checklists/' + options.checklist._id + '?name=modifiedName&pos=124555')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a NOT FOUND response - Checklist updated', function (done) {
                request(app)
                    .put('/api/checklists/' + options.checklist._id + '1?name=modifiedName&pos=124555')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('POST /api/checklists/:id/checklists - Create a checkitem on the checklist', function () {

            it('should send back a OK response - Checklist updated', function (done) {
                request(app)
                    .post('/api/checklists/' + options.checklist._id + '/checkItems')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .send({
                        "name" : "My checkItem",
                        "pos": 1234564
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("My checkItem");
                        res.body.pos.should.equal(1234564);
                        res.body.idChecklist.should.equal(options.checklist._id);
                        done();
                    });
            });

            it('should send back a OK response - Checklist updated by member of the board', function (done) {
                request(app)
                    .post('/api/checklists/' + options.checklist._id + '/checkItems')
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .send({
                        "name" : "My checkItem2",
                        "pos": 1234564
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.equal("My checkItem2");
                        res.body.pos.should.equal(1234564);
                        res.body.idChecklist.should.equal(options.checklist._id);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - Checklist updated by unauthorized user', function (done) {
                request(app)
                    .post('/api/checklists/' + options.checklist._id + '/checkItems')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .send({
                        "name" : "My checkItem",
                        "pos": 1234564
                    })
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('GET /api/checklists/:id/checklists - Get all checkitems of the checklist', function () {

            it('should send back a OK response - CheckItems got', function (done) {
                request(app)
                    .get('/api/checklists/' + options.checklist._id + '/checkItems')
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(2);
                        options.checklist.checkItem = res.body[0];
                        options.checklist.checkItem2 = res.body[1];
                        done();
                    });
            });

            it('should send back a OK response - CheckItems got by a member of board', function (done) {
                request(app)
                    .get('/api/checklists/' + options.checklist._id + '/checkItems')
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array).and.have.length(2);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - CheckItems got by a member who does not belong to the board', function (done) {
                request(app)
                    .get('/api/checklists/' + options.checklist._id + '/checkItems')
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a NOT FOUND response - CheckItems with invalid ID', function (done) {
                request(app)
                    .get('/api/checklists/12' + options.checklist._id + '/checkItems')
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('PUT /api/checklists/:id/checklists/:idChecklist - Update a checkItem', function () {

            it('should send back a OK response - CheckItems updated', function (done) {
                request(app)
                    .put('/api/checklists/' + options.checklist._id + '/checkItems/' +  options.checklist.checkItem._id + '?name=checkNameUp&pos=78945&state=completed' )
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.body.name.should.be.equals("checkNameUp");
                        res.body.pos.should.be.equals(78945);
                        res.body.state.should.be.equals("completed");
                        done();
                    });
            });

            it('should send back a BAD REQUEST response - CheckItems updated with invalid pos', function (done) {
                request(app)
                    .put('/api/checklists/' + options.checklist._id + '/checkItems/' +  options.checklist.checkItem._id + '?pos=s5fds' )
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a FORBIDDEN response - CheckItems updated by member with forbidden access', function (done) {
                request(app)
                    .put('/api/checklists/' + options.checklist._id + '/checkItems/' +  options.checklist.checkItem._id + '?name=checkNameUp&pos=78945&state=completed' )
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('DELETE /api/checklists/:id/checklists/:idChecklist - Delete a checkItem', function () {

            it('should send back a FORBIDDEN response - CheckItems deleted by unauthorized member', function (done) {
                request(app)
                    .delete('/api/checklists/' + options.checklist._id + '/checkItems/' + options.checklist.checkItem._id)
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a OK response - CheckItems deleted by freind member', function (done) {
                request(app)
                    .delete('/api/checklists/' + options.checklist._id + '/checkItems/' + options.checklist.checkItem._id)
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        request(app)
                            .get('/api/checklists/' + options.checklist._id + '/checkItems')
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

            it('should send back a OK response - CheckItems deleted by the member', function (done) {
                request(app)
                    .delete('/api/checklists/' + options.checklist._id + '/checkItems/' + options.checklist.checkItem2._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        request(app)
                            .get('/api/checklists/' + options.checklist._id + '/checkItems')
                            .set('Authorization', 'Bearer ' + options.tokenFreinds)
                            .set('Content-Type', 'application/json')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) return done(err);
                                res.body.should.be.instanceof(Array).and.have.length(0);
                                done();
                            });
                    });
            });

            it('should send back a NOT FOUND response - CheckItems deleted with wrong id', function (done) {
                request(app)
                    .delete('/api/checklists/' + options.checklist._id + '/checkItems/78' + options.checklist.checkItem2._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a NOT FOUND response - CheckItems deleted with wrong checklist id', function (done) {
                request(app)
                    .delete('/api/checklists/' + options.checklist._id + 'd5/checkItems/' + options.checklist.checkItem2._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

        describe('DELETE /api/checklists/:id - Delete a checklist', function () {

            it('should send back a FORBIDDEN response - Checklist deleted by unauthorized member', function (done) {
                request(app)
                    .delete('/api/checklists/' + options.checklist._id)
                    .set('Authorization', 'Bearer ' + options.tokenUnauthorized)
                    .set('Content-Type', 'application/json')
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should send back a OK response - Checklist deleted by freind member', function (done) {
                request(app)
                    .delete('/api/checklists/' + options.checklist._id)
                    .set('Authorization', 'Bearer ' + options.tokenFreinds)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        request(app)
                            .get('/api/checklists/' + options.checklist._id)
                            .set('Authorization', 'Bearer ' + options.token)
                            .set('Content-Type', 'application/json')
                            .expect(404)
                            .end(function (err, res) {
                                done();
                            });
                    });
            });

            it('should send back a NOT FOUND response - Checklist deleted with wrong id', function (done) {
                request(app)
                    .delete('/api/checklists/45' + options.checklist._id)
                    .set('Authorization', 'Bearer ' + options.token)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

        });

    });
};