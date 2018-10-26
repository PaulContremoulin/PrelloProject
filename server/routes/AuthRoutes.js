let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');


router.post('/login',
    passport.authenticate('local', {session: false}),
    function(req, res) {
        const user = req.user.toJSON()
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user
        }, process.env.JWT_SECRET);
        return res.json({user, token});
});


router.post('/signup', function(req, res, next) {
        passport.authenticate('signup', {session: false},
            function (err, user, info) {
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

module.exports = router;