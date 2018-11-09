let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let Member = require('./../models/Member');
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
        if (err) return res.status(400).json({message : err._message});
        newBoard.save(function (err) {
            if (err) {
                debug('POST boards/ error : ' + err);
                return res.status(400).json({message : err._message});
            }
            Member.findByIdAndUpdate(
                { _id: req.user._id},
                { $push: { idBoards: newBoard._id } },
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
        .exec(function (err, board) {
        if (err) debug('GET boards/:id error : ' + err);
        if (!board) return res.status(404).json({message : 'Board not found'});
        return res.status(200).json(board);
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
            if (err) return res.status(400).json({message:err.message});

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
    if(oppenCard) query.populate('cards');
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
 * @route POST /boards/{id}/members/{id}
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @param {string} idMember.path.required - board's id.
 * @param {string} type.query.required - role assigned (observer - admin - normal).
 * @returns {code} 200 - List object
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id/members/:idMember', token, boardAccess.updateRights(), function(req, res) {

    let board = req.board;
    let type = req.query.type ? req.query.type : 'observer';

    if((type === 'admin' && !board.isAdminMember(req.user.id))
        || (type !== 'admin' && board.nbAdmin() <= 1 && req.user.id === req.params.idMember)){
        return res.status(403).json({message : 'Can not set the role of the last administrator'});
    }

    board.createOrUpdateMember(req.params.idMember, type);

    board.validate(function (err) {
        if(err) return res.status(400).json({message:err._message});
        board.save(function (err) {
            if(err) return res.status(500).json({message:'Unexpected internal error'});
            return res.status(200).json(board);
        });
    });
});

module.exports = router;