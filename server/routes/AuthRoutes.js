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
            debug('POST /signup error : ' + err);
            return res.status(500).json({message : 'Unexpected internal error'});
        }
        if (!member) return res.status(400).json({message : info});

        let confirmUrl = process.env.DOMAIN + '/api/members/' + member._id + '/email/confirm?token=' + member.tokenConfirm;

        if(process.env.NODE_ENV === 'test') return res.status(200).end();

        res.status(200).json({message : 'Successful registration'});

        mail.confirmEmailMessage(member, confirmUrl, function(err){
            if(err) {
                debug(err);
            }
        });
    })(req, res, next);
});

/**
 * Login a member
 * @route POST /login
 * @group auth - Operations about authentication
 * @param {Creadential.model} credentials.body.required - user's credentials.
 * @returns {Member.model} 200 - user info object and token object
 * @returns {Error}  400 - Bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, confirm your email before
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', passport.authenticate('local', {session: false}), function(req, res) {
    const member = req.user;
    if(!member.confirmed && process.env.NODE_ENV !== 'test')
        return res.status(403).json({message : 'Confirm your email address before login'});
    else
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
        const member = req.user;
        return res.json({member, token : member.generateJWT()});
    });


/**
 * Send a email at the member to reset his/her password
 * @route POST /auth/forgot/password
 * @group auth - Operations about authentication
 * @param {string} email.body.required - member's email
 * @param {string} callback.body.required - the url to call in the email (token will be attached with member id)
 * @returns {code} 202 - user info object and token object
 * @returns {Error} 400 - Bad request (email or callback url missing / invalid)
 * @returns {Error} 404 - Not found (member not found)
 * @returns {Error} default - Unexpected error
 */
router.post('/auth/forgot/password', function(req, res) {

    if(!req.body.email) return res.status(400).json({message:'Email missing'});

    Member.findOne({email : req.body.email}, function(err, member) {
        if(err) debug('POST /auth/forgot/password error : ' + err)
        if(!member) return res.status(404).json({message:'Not account found'});

        let resetUrl = process.env.DOMAIN + '/login/reset/' + member._id + '/password?token=' + member.generateResetPasswordToken();

        member.save();
        res.status(202).json({message:'Email reset password sent successfully'});

        mail.resetPasswordMessage(member, resetUrl, function(err){
            if(err){
                debug('POST /auth/forgot/password error : ' + err);
            }
        });
    });
});

/**
 * This function comment is parsed by doctrine
 * @route GET /auth/github
 * @group auth - Operations about authentification
 * @returns {code} 302 - Redirection on github Oauth authentication page
 */
router.get('/auth/github', passport.authenticate('github'));

/**
 * This function comment is parsed by doctrine
 * @route GET /auth/github/callback
 * @group auth - Operations about authentification
 * @param {string} code.param.required - github payload
 * @returns {Member.model} 200 - user info object and token object
 */
router.get('/auth/github/callback',
    passport.authenticate('github', { session: false }),
    function(req, res) {
        // Successful authentication
        const member = req.user;
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: req.user.payload()
        }, process.env.JWT_SECRET);
        return res.json({member, token});
    });

module.exports = router;