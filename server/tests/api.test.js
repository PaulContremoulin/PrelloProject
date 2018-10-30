// API TEST

let request = require('supertest');
let chai = require('chai')
let mongoose = require('mongoose');
let should = chai.should();

// Helpers

describe('PRELLO SERVER API TEST', function() {

    let app = require('./../app');
    let auth = {}
    let server;

    this.timeout(10000); // Delay to start the server

    // Called once before any of the tests in this block begin.
    before(function (done) {
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

    describe('ALL TESTS SHOULD BE PASS', function() {
        require('./api/auth.test')(app, auth);
        require('./api/board.test')(app, auth);
    });

});
