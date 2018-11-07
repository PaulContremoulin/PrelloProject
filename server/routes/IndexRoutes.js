let express = require('express');
let router = express.Router();

router.get('/', function(req, res,) {
    res.send('<h1>Hello world</h1>');
});

module.exports = router;
