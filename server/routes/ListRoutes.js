let express = require('express');
let router = express.Router();
let List = require('./../models/List');
let listAccess = require('./../middlewares/ListAccess');


/**
 * Get a list
 * @route Get /lists/{id}
 * @group list - Operations about lists
 * @param {string} id.param.required - the list's id
 * @returns {List} 200 - List got
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, the member does not have the rights
 * @returns {Error}  404 - Not found, list not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', listAccess.readRights(), function(req, res) {

    req.body._id = req.params.id

    List.findOne(req.body, function (err, list) {
        if (err) return res.status(404).send('Not found');
        if (!list) return res.status(404).send('Not found');
        return res.status(200).json(list);
    });

});

/**
 * Archive or unarchive a list
 * @route PUT /lists/{id}/closed
 * @group list - Operations about lists
 * @param {string} id.param.required - the list's id
 * @param {boolean} value.query.required - the value (true = close, false = open)
 * @returns {code} 200 - List updated
 * @returns {Error}  400 - bad request, value parameter missing
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, the member does not have the rights
 * @returns {Error}  404 - Not found, list not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id/closed', listAccess.updateRights(), function(req, res) {
    if(!req.query.value) res.status(400).send('Value missing.')
    let list = req.list;
    list.closed = req.query.value;

    list.validate(function (err) {
        if(err) return res.status(400).send(err);
        list.save(function (err) {
            if(err) return res.status(500).send('Internal error');
            return res.status(200).end();
        });
    });
});

/**
 * Rename a list
 * @route PUT /lists/{id}/name
 * @group list - Operations about lists
 * @param {string} id.param.required - the list's id
 * @param {string} value.query.required - the name value
 * @returns {code} 200 - List updated
 * @returns {Error}  400 - bad request, value parameter missing
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, the member does not have the rights
 * @returns {Error}  404 - Not found, list not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id/name', listAccess.updateRights(), function(req, res) {
    if(!req.query.value) res.status(400).send('Value missing.')
    let list = req.list;
    list.name = req.query.value;

    list.validate(function (err) {
        if(err) return res.status(400).send(err);
        list.save(function (err) {
            if(err) return res.status(500).send('Internal error');
            return res.status(200).end();
        });
    });
});


/**
 * Change the position of a list
 * @route PUT /lists/{id}/pos
 * @group list - Operations about lists
 * @param {string} id.param.required - the list's id
 * @param {number} value.query.required - the position value
 * @returns {code} 200 - List updated
 * @returns {Error}  400 - bad request, value parameter missing
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, the member does not have the rights
 * @returns {Error}  404 - Not found, list not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id/name', listAccess.updateRights(), function(req, res) {
    if(!req.query.value) res.status(400).send('Value missing.')
    let list = req.list;
    list.post = req.query.value;

    list.validate(function (err) {
        if(err) return res.status(400).send(err);
        list.save(function (err) {
            if(err) return res.status(500).send('Internal error');
            return res.status(200).end();
        });
    });
});

module.exports = router;