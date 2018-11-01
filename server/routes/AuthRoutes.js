let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');


/**
 * This function comment is parsed by doctrine
 * @route POST /signup
 * @group auth - Operations about authentification
 * @param {MemberNew.model} data.body.required - user's information
 * @returns {None} 200 - None
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
 * @returns {Member.model} 200 - user info object and token object
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', passport.authenticate('local', {session: false}), function(req, res) {
    const member = req.user
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: req.user.payload()
    }, process.env.JWT_SECRET);
    return res.json({member, token});
});

module.exports = router;