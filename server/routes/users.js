let express = require('express');
let router = express.Router();


router.get('/', function(req, res) {
        return res.send('Authorized. <3');
    });

module.exports = router;
