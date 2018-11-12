let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let Member = require('./../models/Member');
let Label = require('./../models/Label');
let List = require('./../models/List');
let debug = require('debug')('app:board');
let boardAccess = require('./../middlewares/BoardAccess');
const token = require('./../middlewares/TokenAccess');

/**
 * Create a board
 * @route POST /boards
 * @group board - Operations about boards
 * @param {NewBoard.model} board.body.required - board's information.
 * @returns {Board.model} 201 - Board created
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/', token, function(req, res) {

    let newBoard = new Board(req.body);

    newBoard.createOrUpdateMember(req.user._id, "admin", true);

    newBoard.validate(function (err) {
        if (err) return res.status(400).json({message : err});
        newBoard.save(function (err) {
            if (err) {
                debug('POST boards/ error : ' + err);
                return res.status(400).json({message : err});
            }
            Member.findByIdAndUpdate(
                { _id: req.user._id},
                { $addToSet: { idBoards: newBoard._id } },
                function (err) {
                    if (err) return res.status(500).json({message : 'Unexpected internal error'});
                    return res.status(201).json(newBoard);
                });
        });
    });
});

/**
 * Get a board by id
 * @route GET /boards/{id}
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @returns {Board.model} 200 - Board object
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', token, boardAccess.readRights(), function(req, res) {

    req.query._id = req.params.id;

    Board.findById(req.query)
        .populate('memberships.idMember', '_id username firstName lastName')
        .populate('labels')
        .exec(function (err, board) {
        if (err) debug('GET boards/:id error : ' + err);
        if (!board) return res.status(404).json({message : 'Board not found'});
        return res.status(200).json(board);
    });
});

/**
 * Update a board by id
 * @route PUT /boards/{id}
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id
 * @param {string} name.query - board's name.
 * @param {string} desc.query - board's description.
 * @param {string} closed.query - board's archived or not.
 * @returns {code} 200 - Board updated successfully
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id', token, boardAccess.updateRights(), function(req, res) {

    let board = req.board;

    (req.query.name) ? board.name = req.query.name : null;
    (req.query.desc) ? board.desc = req.query.desc : null;
    (req.query.closed) ? board.closed = req.query.closed : null;

    board.validate(function (err) {
        if(err) return res.status(400).json({message:err});
        board.save(function (err) {
            if(err) {
                debug('PUT board/:id error : ' + err);
                return res.status(500).json({message:'Unexpected internal error'});
            }
            return res.status(200).json({message:'Board updated successfully'});
        });
    });
});

/**
 * Create a list on the board
 * @route POST /boards/{id}/lists
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @param {ListNew.model} list.body.required - list's information
 * @returns {List.model} 200 - List object
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/lists', token, boardAccess.updateRights(), function(req, res) {

    req.body.idBoard = req.params.id;

    Board.findById(req.params.id)
        .exec(function (err, board) {
        if (err) debug('POST boards/:id/lists error : ' + err);
        if (!board)
            return res.status(404).json({message:'Board not found'});

        let newList = new List(req.body);
        newList.validate(function (err) {
            if (err) return res.status(400).json({message:err});

            newList.save(function (err) {
                if (err) {
                    debug('POST boards/:id/lists error : ' + err);
                    return res.status(500).json({message:'Unexpected internal error'});
                }
                res.status(201).json(newList);
            });
        });
    });
});


/**
 * Get lists of the board
 * @route GET /boards/{id}/lists
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @returns {Array.<List>} 200 - List object
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/lists', token, boardAccess.readRights(), function(req, res) {
    req.query.idBoard = req.board._id;
    var oppenCard = false;
    if(req.query.cards){
        if(req.query.cards === 'open') oppenCard = true;
        delete req.query.cards;
    }
    var query = List.find(req.query);
    if(oppenCard) query.populate('cards').populate('cards.idLabels');
    query.exec(function(err, lists){
        if(err) {
            debug('GET boards/:id/lists error : ' + err)
            return res.status(500).json({message:'Unexpected internal error'});
        }
        return res.status(200).json(lists)
    });
});

/**
 * Add the member at the board (or update role)
 * @route PUT /boards/{id}/members/{id}
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @param {string} idMember.path.required - board's id.
 * @param {string} type.query.required - role assigned (observer - admin - normal).
 * @returns {Membership.model} 200 - A member added
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id/members/:idMember', token, boardAccess.updateRights(), function(req, res) {

    let board = req.board;
    let type = req.query.type ? req.query.type : 'observer';

    if((type === 'admin' && !board.isAdminMember(req.user.id)) || (type !== 'admin' && board.isAdminMember(req.params.idMember) && !board.isAdminMember(req.user.id)))
        return res.status(403).json({message : 'Forbidden access'});

    if(type !== 'admin' && board.nbAdmin() <= 1 && board.isAdminMember(req.params.idMember))
        return res.status(403).json({message : 'Can not set the role of the last administrator'});

    let membership = board.createOrUpdateMember(req.params.idMember, type);

    board.validate(function (err) {
        if(err) return res.status(400).json({message:err});
        board.save(function (err) {
            if(err) return res.status(500).json({message:'Unexpected internal error'});

            Member.findByIdAndUpdate(
                { _id: req.params.idMember},
                { $addToSet: { idBoards: board._id } },
                {
                    "fields": { "username":1, "lastName": 1, "firstName" : 1, "_id": 1 },
                    "new": true
                }).exec(function (err, member) {
                    if (!member) return res.status(500).json({message : 'Unexpected internal error'});
                    membership.idMember = member;
                    return res.status(200).json(membership);
                });
        });
    });
});

/**
 * Get members of a board
 * @route GET /boards/{id}/members
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @returns {Array.<MembershipDetail>} 200 - Members object
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/members', token, boardAccess.readRights(), function(req, res) {

    Board.findById(req.params.id, {_id : 1, memberships: 1})
        .populate('memberships.idMember', 'username firstName lastName')
        .exec(function (err, board) {
            if (err) debug('GET boards/:id error : ' + err);
            if (!board) return res.status(404).json({message : 'Board not found'});
            return res.status(200).json(board.memberships);
        });
});

/**
 * Delete a member of a board
 * @route DELETE /boards/{id}/members/{idMemberShip}
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @param {string} idMemberShip.path.required - MemberShip's id.
 * @returns {code} 200 - Members deleted successfully
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.delete('/:id/members/:idMemberShip', token, boardAccess.deleteRights(), function(req, res) {

    let board = req.board;

    if(board.nbAdmin() <= 1 && board.isAdminMember(req.params.idMemberShip))
        return res.status(403).json({message : 'Can not delete the last administrator'});

    if(!board.memberships.pull(req.params.idMemberShip)) return res.status(404).json({message : 'Membership id not found'});

    board.validate(function (err) {
        if (err) return res.status(400).json({message: err});
        board.save(function (err) {
            if (err) {
                debug('PUT board/:id error : ' + err);
                return res.status(500).json({message: 'Unexpected internal error'});
            }
            return res.status(200).json({message: 'Board updated successfully'});
        });
    });

});

/**
 * Create a label
 * @route POST /boards/{id}/labels
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @param {string} name.query.required - label's name.
 * @param {string} color.query.required - label's color.
 * @returns {Label.model} 200 - Label object
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/labels', token, boardAccess.readRights(), function(req, res) {

    if(!req.query.name) return res.status(400).json({message: 'Label name missing'});
    if(!req.query.color) return res.status(400).json({message: 'Label color missing'});

    let label = new Label({name : req.query.name, color : req.query.color, idBoard : req.board._id});

    label.validate(function(err){
        if(err) return res.status(400).json({message: err});
        label.save(function(err){
            if(err) return res.status(500).json({message:'Unexpected internal error.'});
            return res.status(201).json(label);
        })
    })

});

module.exports = router;