let express = require('express');
let router = express.Router();
let debug = require('debug')('app:checklists');
let Checklist = require('./../models/Checklist');
let CheckItem = require('./../models/CheckItem');
let ChecklistAccess = require('./../middlewares/ChecklistAccess');
const token = require('./../middlewares/TokenAccess');

/**
 * Get a checklist
 * @route GET /checklist/:id
 * @group checklist - Operations about checklists
 * @param {string} id.path.required - checklist's id
 * @returns {Checklist.model} 200 - Checklist with checkItems
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Invalid
 * @returns {Error}  404 - Checklist not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', token, ChecklistAccess.readRights(), function(req, res) {

    Checklist.findById(req.params.id)
        .populate('checkItems')
        .exec(function (err, checklist) {
            if (err) debug(err);
            if (!checklist) return res.status(404).json({message:'Checklist not found'});
            if (!checklist.idBoard) return res.status(500).json({message:'Unexpected internal error'});
            return res.status(200).json(checklist);
        });
});

/**
 * Update checklist
 * @route PUT /checklist/{id}
 * @group checklist - Operations about checklists
 * @param {string} id.path.required - checklist's id
 * @param {string} name.query - checkItem's name
 * @param {number} pos.query - checkItem's position
 * @returns {CheckList} 200 - CheckList updated
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Checklist not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id', token, ChecklistAccess.updateRights(), function(req, res) {

    let checklist = req.checklist;

    (req.query.name) ? checklist.name = req.query.name : null;
    (req.query.pos) ? checklist.pos = req.query.pos : null;

    checklist.validate( (err) => {
        if(err) return res.status(400).json({message : err});
        checklist.save( (err) => {
            if(err) return res.status(500).json({message : "Unexpected internal error"});
            return res.status(200).json(checklist);
        })
    });
});

/**
 * Create a checkItem
 * @route POST /checklist/:id/checkItems
 * @group checklist - Operations about checklists
 * @param {string} id.path.required - checklist's id
 * @param {CheckItem.model} checkItem.body.required - checkItem's information.
 * @returns {CheckItem.model} 201 - CheckItem created
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Checklist not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/checkItems', token, ChecklistAccess.updateRights(), function(req, res) {

    req.body.idChecklist = req.params.id;

    let checkItem = new CheckItem(req.body);

    checkItem.validate( (err) => {
       if(err) return res.status(400).json({message : err});
       checkItem.save( (err) => {
           if(err) return res.status(500).json({message : "Unexpected internal error"});
           return res.status(201).json(checkItem);
       })
    });
});


/**
 * Get checkItems
 * @route GET /checklist/:id/checkItems
 * @group checklist - Operations about checklists
 * @param {string} id.path.required - checklist's id
 * @returns {Array.<CheckItem>} 200 - CheckItem array
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Checklist not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/checkItems', token, ChecklistAccess.readRights(), function(req, res) {

    CheckItem.find({idChecklist : req.params.id})
        .exec(function (err, checkItems) {
            if (err) debug(err);
            if (!checkItems) return res.status(404).json({message:'CheckItems not found'});
            return res.status(200).json(checkItems);
        });
});

/**
 * Update checkItems
 * @route PUT /checklist/{id}/checkItems/{idCheckItem}
 * @group checklist - Operations about checklists
 * @param {string} id.path.required - checklist's id
 * @param {string} idCheckItem.path.required - checkItem's id
 * @param {string} name.query - checkItem's name
 * @param {number} pos.query - checkItem's position
 * @param {string} state.query - checkItem's state (completed, uncompleted)
 * @returns {Array.<CheckItem>} 200 - CheckItem array
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Checklist not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id/checkItems/:idCheckItem', token, ChecklistAccess.updateRights(), function(req, res) {

    CheckItem.findOne({_id : req.params.idCheckItem, idChecklist : req.params.id})
        .exec(function (err, checkItem) {
            if (err) debug(err);
            if (!checkItem) return res.status(404).json({message:'CheckItem not found'});

            (req.query.name) ? checkItem.name = req.query.name : null;
            (req.query.pos) ? checkItem.pos = req.query.pos : null;
            (req.query.state) ? checkItem.state = req.query.state : null;

            checkItem.validate( (err) => {
                if(err) return res.status(400).json({message : err});
                checkItem.save( (err) => {
                    if(err) return res.status(500).json({message : "Unexpected internal error"});
                    return res.status(200).json(checkItem);
                })
            });
        });
});


/**
 * Delete a checkItems
 * @route DELETE /checklist/{id}/checkItems/{idCheckItem}
 * @group checklist - Operations about checklists
 * @param {string} id.path.required - checklist's id
 * @param {string} idCheckItem.path.required - checkItem's id
 * @returns {code} 200 - CheckItem deleted
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Checklist not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.delete('/:id/checkItems/:idCheckItem', token, ChecklistAccess.updateRights(), function(req, res) {

    CheckItem.findOne({_id : req.params.idCheckItem, idChecklist : req.params.id})
        .exec(function (err, checkItem) {
            if (err) debug(err);
            if (!checkItem) return res.status(404).json({message:'CheckItem not found'});
            checkItem.remove()
            checkItem.save( (err) => {
                if(err) return res.status(500).json({message : "Unexpected internal error"});
                return res.status(200).json({message : "CheckItem successfully deleted"});
            });
        });
});

/**
 * Delete a checklist
 * @route DELETE /checklist/:id
 * @group checklist - Operations about checklists
 * @param {string} id.path.required - checklist's id
 * @returns {code} 200 - CheckItem deleted
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Checklist not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.delete('/:id', token, ChecklistAccess.updateRights(), function(req, res) {

    let checklist = req.checklist;

    checklist.remove();

    checklist.save( (err) => {
        if(err) return res.status(500).json({message : "Unexpected internal error"});
        return res.status(200).json({message : "Checklist successfully deleted"});
    });
});

module.exports = router;