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
    // Validate the card
    newCard.validate(function (error) {
        if (error) return res.status(400).json(error);
        // Save the card
        newCard.save(function (err) {
            if (err) {
                debug('Error in Saving card: ' + err);
                return res.status(500).json(err);
            }
            debug('Card Registration successful');
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
        if(err) debug('Error in GET cards/:id');
        if(!card) return res.status(404).send('Card not found');
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
            if(err) return res.status(500).send('Internal error');
            return res.status(200).end();
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

    if(!mongoose.Types.ObjectId.isValid(req.query.value)){
        return res.status(404).end();
    }

    if(!req.query.value) return res.status(400).send('Member id missing');

    let card = req.card;

    let newMember = card.idList.idBoard.getMember(req.query.value);

    if(!newMember) return res.status(403).send('Member doesn\'t belong at the board');

    card.createOrUpdateMember(newMember.idMember);

    card.validate(function (err) {
        if(err) return res.status(400).send(err);
        card.save(function (err) {
            if(err) return res.status(500).send('Internal error');
            return res.status(200).end();
        });
    });
});


module.exports = router;