let express = require('express');
let router = express.Router();
let Card = require('./../models/Card');
let debug = require('debug')('app:card');
let CardAccess = require('./../middlewares/CardAccess');
let mongoose = require('mongoose');

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
router.post('/', CardAccess.createRights(), function(req, res) {

    let newCard = new Card(req.body);

    newCard.validate(function (err) {
        if (err) return res.status(400).json({message : err._message});
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
 * @returns {Card.model} 200 - Card
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, invalid rights
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', CardAccess.readRights(), function(req, res) {

    Card.findById(req.params.id, function(err, card){
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
router.put('/:id', CardAccess.updateRights(), function(req, res) {

    let card = req.card;

    (res.query.name) ? card.name = res.query.name : null;
    (res.query.desc) ? card.desc = res.query.desc : null;
    (res.query.closed) ? card.closed = res.query.closed : null;
    (res.query.due) ? card.due = res.query.due : null;
    (res.query.dueComplete) ? card.dueComplete = res.query.dueComplete : null;

    card.validate(function (err) {
        if(err) return res.status(400).send(err);
        card.save(function (err) {
            if(err) {
                debug('PUT cards/:id error : ' + err)
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
 * @param {string} value.query.required - member id to add
 * @returns {code} 200 - Card created
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/idMembers', CardAccess.updateRights(), function(req, res) {

    if(!req.query.value) return res.status(400).json({message:'Member id missing'});

    let card = req.card;
    let newMember = card.idList.idBoard.getMember(req.query.value);

    if(!newMember)
        return res.status(403).json({message : 'Member does not belong to the associated board'});

    card.createOrUpdateMember(newMember.idMember);

    card.validate(function (err) {
        if(err) return res.status(400).json({message : err._message});
        card.save(function (err) {
            if(err) return res.status(500).json({message:'Unexpected internal error'});
            return res.status(200).json({message : 'Member added successfully at the card'});
        });
    });
});


module.exports = router;