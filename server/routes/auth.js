let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login',
    passport.authenticate('local', {session: false}),
    function(req, res) {
        const user = req.user;
        console.log("USER ==> " + user);
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        return res.json({user, token});
});

router.post('/signup',
    passport.authenticate('signup', {session: false}),
    function(req, res) {
        return res.json(req.user);
    });

module.exports = router;