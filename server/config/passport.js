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
        Member.findOne({ username: username, loginType:'password' }, function (err, user) {
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
            email: req.body.email,
            organization : req.body.organization,
            loginType : 'password'
        });

        newUser.setPassword(password);

        newUser.validate(function (err) {
            if (err) return done(null, false, {message: err});
            // save the user
            newUser.save(function (err) {
                if (err) {
                    debug('Error in Saving user: ' + err);
                    throw err;
                }
                debug('User Registration successful');
                return done(null, newUser);
            });
        });
    }));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://' + process.env.DOMAIN + '/login/github'
    },
    function(accessToken, refreshToken, profile, cb) {

        Member.findOne({ oauth: { github : profile.id } }, function (err, user) {
            if(err) return cb(err, null);
            if(user) return cb(null, user);

            let jsonProfile = profile._json;

            let userInfo = {};
            jsonProfile.id !== null ? userInfo.oauth = { github : jsonProfile.id }: null;
            profile.username !== null ? userInfo.username = profile.username : null;
            jsonProfile.email !== null ? userInfo.email = jsonProfile.email : null;
            userInfo.lastName = 'unknown';
            userInfo.firstName = 'unknown';
            userInfo.loginType = 'saml';

            let newOauthUser = new Member(userInfo);

            newOauthUser.validate(function (err) {
                if (err) return cb(err, null);
                // save the user
                newOauthUser.save(function (err) {
                    if (err) {
                        debug('Error in Saving user: ' + err);
                        return cb(err, null);
                    }
                    debug('User oauth registration');
                    return cb(null, newOauthUser);
                });
            });

        });


    }
));
