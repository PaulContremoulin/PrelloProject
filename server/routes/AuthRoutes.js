let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');
let debug = require('debug')('app:auth');
let mail = require('./../config/mailing');
let Member = require('./../models/Member');

/**
 * Register a member
 * @route POST /signup
 * @group auth - Operations about authentication
 * @param {MemberNew.model} data.body.required - user's information
 * @returns {None} 200 - None
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', {session: false}, function (err, member, info) {
        if (err) {
            debug(err)
            return res.status(500);
        }
        if (!member) return res.status(400).send(info);
        let confirmUrl = process.env.HOST + ':' + process.env.PORT + '/api/members/' + member._id + '/email/confirm?token=' + member.tokenConfirm;
        if(req.body.callback) confirmUrl += '&callback=' + req.body.callback;
        if(process.env.NODE_ENV === 'test') return res.status(200).end();
        mail.confirmEmailMessage(member, confirmUrl, function(err){
            if(err) {
                debug(err);
                return res.status(500).end();
            }
            return res.status(200).end();
        });
    })(req, res, next);
});

/**
 * Login a member
 * @route POST /login
 * @group auth - Operations about authentication
 * @param {Creadential.model} credentials.body.required - user's credentials.
 * @returns {Member.model} 200 - user info object and token object
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', passport.authenticate('local', {session: false}), function(req, res) {
    const member = req.user;
    if(!member.confirmed && process.env.NODE_ENV !== 'test') return res.status(403).send('Confirm your email address before.')
    return res.json({member, token : member.generateJWT()});
});

/**
 * Redirect url to github OAuth
 * @route GET /auth/github
 * @group auth - Operations about authentification
 * @returns {code} 302 - Redirection on github Oauth authentication page
 */
router.get('/auth/github', passport.authenticate('github'));

/**
 * Github callback authentication
 * @route GET /auth/github/callback
 * @group auth - Operations about authentification
 * @param {string} code.param.required - github payload
 * @returns {Member.model} 200 - user info object and token object
 * @returns {Error} 500 - Internal error
 */
router.get('/auth/github/callback',
    passport.authenticate('github', { session: false }),
    function(req, res) {
        // Successful authentication
        const member = req.user;
        return res.json({member, token : member.generateJWT()});
    });


/**
 * Send a email at the member to reset his/her password
 * @route GET /auth/login/forgot/password
 * @group auth - Operations about authentication
 * @param {string} email.body.required - member's email
 * @param {string} callback.body.required - the url to call in the email (token will be attached with member id)
 * @returns {code} 200 - user info object and token object
 * @returns {Error} 400 - Bad request (email or callback url missing / invalid)
 * @returns {Error} 404 - Not found (member not found)
 * @returns {Error} default - Unexpected error
 */
router.post('/auth/forgot/password', function(req, res) {

    if(!req.body.email) return res.status(400).send('Email is missing.');
    if(!req.body.callback) return res.status(400).send('Url callback is missing.');

    Member.findOne({email : req.body.email}, function(err, member) {
        if(err) return res.status(400).send('Invalid email.');
        if(!member) return res.status(404).end();

        let resetUrl = req.body.callback + '/login/reset/' + member._id + '/password?token=' + member.generateResetPasswordToken();

        mail.resetPasswordMessage(member, resetUrl, function(err){
            if(err){
                debug('Error when sending reset password : ' + err.message);
                return res.status(500).end();
            }
            member.save();
            return res.status(202).end();
        });
    });
});

module.exports = router;