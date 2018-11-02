let passport = require('passport');
let passportJWT = require('passport-jwt');
let LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let crypto = require('./crypto');
let debug = require('debug')('app:passport');
let Member = require('../models/Member');

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        Member.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                debug('Incorrect username.')
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                debug('Incorrect password.' )
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return Member.findById(jwtPayload.data._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        // if there is no user with that username
        // create the user
        let newUser = new Member({
            username: username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        // set the user's local credentials
        newUser.salt = crypto.getSalt();
        newUser.hash = crypto.sha512(password, newUser.salt).passwordHash;

        newUser.validate(function (error) {
            if (error) {
                return done(null, false, {message: error});
            }
            else {
                // save the user
                newUser.save(function (err) {
                    if (err) {
                        debug('Error in Saving user: ' + err);
                        throw err;
                    }
                    debug('User Registration successful');
                    return done(null, newUser);
                });
            }
        });
    }));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.HOST + ':' + process.env.PORT + process.env.GITHUB_CLIENT_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        debug('Profil github : ' + JSON.stringify(profile))
        return cb(null, profile);
    }
));