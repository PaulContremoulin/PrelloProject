// API TEST

process.env.NODE_ENV = 'test'

let request = require('supertest');
let mongoose = require('mongoose');

function createApp() {
    return require('./../app');
}


describe('PRELLO SERVER API TEST', function() {

    let app;
    let server;

    this.timeout(10000); // Delay to start the server

    // Called once before any of the tests in this block begin.
    before(function (done) {
        app = createApp();
        server = app.listen(function (err) {
            if (err) return done(err);
            mongoose.connection.once('connected', () => {
                mongoose.connection.db.dropDatabase();
                done();
            });
        });
    });

    after(function(done) {
        server.close()
        mongoose.connection.close()
        done()
    });

    describe('GET /', function() {

        it('should send back a OK response', function(done) {
            request(app)
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    if(err) return done(err)
                    done();
                });
        });

    });


    describe('POST /api/signup', function() {

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

    describe('POST /api/login', function() {

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