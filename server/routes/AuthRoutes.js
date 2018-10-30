let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');


/**
 * @typedef Creadential
 * @property {string} username.required - the user's username
 * @property {string} password.required - the user's password
 */

/**
 * @typedef UserInformation
 * @property {string} username.required - the user's username
 * @property {string} password.required - the user's password
 * @property {string} email.required - the user's email
 * @property {string} firstName.required - the user's firstName
 * @property {string} lastName.required - the user's lastName
 * @property {string} password.required - the user's password
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /signup
 * @group auth - Operations about authentification
 * @param {UserInformation.model} data.body.required - user's information
 * @returns {object} 200 - user info object and token object
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', {session: false}, function (err, user, info) {
        if (err) {
            console.log(err)
            return res.status(500)
        }
        else if (!user) {
            return res.status(400).send(info)
        }
        return res.status(200).end();
    })(req, res, next);
});

/**
 * This function comment is parsed by doctrine
 * @route POST /login
 * @group auth - Operations about authentification
 * @param {Creadential.model} credentials.body.required - user's credentials.
 * @returns {object} 200 - user info object and token object
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', passport.authenticate('local', {session: false}), function(req, res) {
    const member = req.user.toPublic()
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: req.user.payload()
    }, process.env.JWT_SECRET);
    return res.json({member, token});
});

module.exports = router;