let passport = require('passport');
let passportJWT = require('passport-jwt');
let LocalStrategy = require('passport-local').Strategy;
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let crypto = require('./crypto');

let User = require('../models/User');

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
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
        return User.findById(jwtPayload.id)
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
        // find a user in Mongo with provided username
        User.findOne({'username':username},function(err, user) {
            // In case of any error return
            if (err){
                console.log('Error in SignUp: '+err);
                return done(err);
            }
            // already exists
            if (user) {
                console.log('User already exists');
                return done(null, false, { message: 'User Already Exists' });
            } else {
                // if there is no user with that username
                // create the user
                var newUser = new User();
                // set the user's local credentials
                newUser.username = username;
                newUser.firstName = req.param('firstName');
                newUser.lastName = req.param('lastName');
                newUser.email = req.param('email');
                newUser.salt = crypto.getSalt();
                newUser.hash = crypto.sha512(password, newUser.salt).passwordHash;

                // save the user
                newUser.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);
                        throw err;
                    }
                    console.log('User Registration successful');
                    return done(null, newUser);
                });
            }
        });
    }
));