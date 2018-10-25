let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login',
    passport.authenticate('local', {session: false}),
    function(req, res) {
        const token = jwt.sign(req.user, process.env.JWT_SECRET);
        return res.json({user, token});
});

module.exports = router;
