let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
        console.log(req.user.validPassword('1234'))
        return res.send('Authorized. <3');
    });

module.exports = router;
