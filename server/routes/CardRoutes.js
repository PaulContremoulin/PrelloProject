let express = require('express');
let router = express.Router();
let Card = require('./../models/Card');
let Label = require('./../models/Label');
let Checklist = require('./../models/Checklist');
let debug = require('debug')('app:card');
let CardAccess = require('./../middlewares/CardAccess');
let mongoose = require('mongoose');
const token = require('./../middlewares/TokenAccess');

/**
 * Create a card
 * @route POST /cards
 * @group card - Operations about cards
 * @param {Card.model} card.body.required - card's information.
 * @returns {Card.model} 201 - Card created
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Invalid rights
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/', token, CardAccess.createRights(), function(req, res) {

    let newCard = new Card(req.body);

    newCard.validate(function (err) {
        if (err) return res.status(400).json({message : err});
        newCard.save(function (err) {
            if (err) {
                debug('POST cards error : ' + err);
                return res.status(500).json({message : 'Unexpected internal error'});
            }
            return res.status(201).json(newCard);
        });
    });
});

/**
 * Get a card by id
 * @route GET /cards/:id
 * @group card - Operations about cards
 * @param {string} id.path.required - card's id
 * @param {string} checklists.query - card's checklist (value on "open" to display)
 * @returns {Card.model} 200 - Card
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, invalid rights
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', token, CardAccess.readRights(), function(req, res) {

    var openChecklist = false;
    if(req.query.checklist){
        if(req.query.checklist === 'open') openChecklist = true;
        delete req.query.checklist;
    }

    req.query._id = req.params.id

    let query = Card.findOne(req.query);
    query.populate('idLabels');
    if(openChecklist) {
        query.populate(
            {
                path: 'checklists',
                populate: {path: 'checkItems'}
            });
    }
    query.exec(function(err, card){
            if(err) debug('GET cards/:id error : ' + err);
            if(!card) return res.status(404).json({message:'Card not found'});
            return res.status(200).json(card);
        });
});

/**
 * Update a card
 * @route PUT /cards/:id
 * @group card - Operations about cards
 * @param {string} name.query - card's name
 * @param {string} desc.query - card's description
 * @param {boolean} closed.query - card's closed state
 * @param {string} due.query - card's due date
 * @param {boolean} dueComplete.query - card's due date completed
 * @returns {code} 200 - Card updated
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, member has not rights access
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id', token, CardAccess.updateRights(), function(req, res) {

    let card = req.card;

    (req.query.name) ? card.name = req.query.name : null;
    (req.query.desc) ? card.desc = req.query.desc : null;
    (req.query.closed) ? card.closed = req.query.closed : null;
    (req.query.due) ? card.due = req.query.due : null;
    (req.query.dueComplete) ? card.dueComplete = req.query.dueComplete : null;

    card.validate(function (err) {
        if(err) return res.status(400).json({message:err});
        card.save(function (err) {
            if(err) {
                debug('PUT cards/:id error : ' + err);
                return res.status(500).json({message:'Unexpected internal error'});
            }
            return res.status(200).json({message:'Card updated successfully'});
        });
    });
});

/**
 * Add a member to the card
 * @route POST /cards/:id/idMembers
 * @group card - Operations about cards
 * @param {string} id.path.required - card's id
 * @param {string} value.query.required - member id to add
 * @returns {code} 200 - Card created
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/idMembers', token, CardAccess.updateRights(), function(req, res) {

    if(!req.query.value) return res.status(400).json({message:'Member id missing'});

    let card = req.card;
    let newMember = card.idList.idBoard.getMember(req.query.value);

    if(!newMember)
        return res.status(403).json({message : 'Member does not belong to the associated board'});

    card.createOrUpdateMember(newMember.idMember);

    card.validate(function (err) {
        if(err) return res.status(400).json({message : err});
        card.save(function (err) {
            if(err) return res.status(500).json({message:'Unexpected internal error'});
            return res.status(200).json({message : 'Member added successfully at the card'});
        });
    });
});

/**
 * Add a checklist to the card
 * @route POST /cards/:id/checklists
 * @group card - Operations about cards
 * @param {string} id.params.required - cards
 * @param {Checklist.model} checklist.body.required - checklist
 * @returns {code} 200 - Checklist created
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, card not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/checklists', token, CardAccess.updateRights(), function(req, res) {

    let card = req.card;
    req.body.idBoard = card.idBoard;
    req.body.idCard = card._id;
    let newChecklist = new Checklist(req.body);

    newChecklist.validate(function (err) {
        if(err) return res.status(400).json({message : err});
        newChecklist.save(function (err) {
            if(err) return res.status(500).json({message:'Unexpected internal error'});
            return res.status(201).json(newChecklist);
        });
    });
});

/**
 * Get all checklists of the card
 * @route GET /cards/:id/checklists
 * @group card - Operations about cards
 * @param {string} id.params.required - cards
 * @returns {Array.<Checklist>} 200 - Array of checklists of the card
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, card not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/checklists', token, CardAccess.readRights(), function(req, res) {

    Checklist.find({idCard : req.params.id})
        .exec(function(err, checklists){
            if(err) debug('GET cards/:id/checklists error : ' + err);
            if(!checklists) return res.status(400).json({message:'Checklists not found'});
            return res.status(200).json(checklists);
        });

});


/**
 * Add a label to the card
 * @route POST /cards/{id}/idLabels
 * @group card - Operations about cards
 * @param {string} id.path.required - board's id.
 * @param {string} value.query.required - label's id value to add.
 * @returns {Code} 200 - Label added
 * @returns {Error}  400 - Bad request, label already added
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, invalid credentials
 * @returns {Error}  404 - Not found, card or label is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/idLabels', token, CardAccess.updateRights(), function(req, res) {

    Label.findById(req.query.value, function(err, label){
        if(err) debug ('card/:id/idLabels error : ' + err);
        if(!label) return res.status(404).json({message : 'Label not found'});
        if(!label.idBoard.equals(req.card.idBoard)) return res.status(400).json({message : 'Bad request, provide a label associate with the same board'});
        req.card.idLabels.push(label._id);
        req.card.validate(function(err){
            if(err) return res.status(400).json({message : 'Label already added'});
            req.card.save(function(err){
                if(err)  return res.status(500).json({message : 'Unexpected internal error'});
                return res.status(201).json({message : 'Label added successfully'});
            });
        });
    });

});

/**
 * Remove a label from a card
 * @route DELETE /cards/{id}/idLabels/{idLabel}
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @param {string} idLabel.path.required - label's id to remove.
 * @returns {Code} 200 - Label removed
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, invalid credentials
 * @returns {Error}  404 - Not found, card is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.delete('/:id/idLabels/:idLabel', token, CardAccess.updateRights(), function(req, res) {

    if(!mongoose.Types.ObjectId.isValid(req.params.idLabel))
        return res.status(404).json({message : 'Label id wrong'});

    req.card.idLabels.remove(req.params.idLabel);
    req.card.save(function(err){
        if(err) return res.status(400).json({message : err});
        return res.status(200).json({message : 'Label removed successfully'});
    })

});

module.exports = router;