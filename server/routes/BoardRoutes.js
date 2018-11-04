let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let Member = require('./../models/Member');
let List = require('./../models/List');
let debug = require('debug')('app:board');
let boardAccess = require('./../middlewares/boardAccess');

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
router.post('/', function(req, res) {

    let newBoard = new Board(req.body);

    newBoard.createOrUpdateMember(req.user._id, "admin", true);

    // Validate the board
    newBoard.validate(function (error) {
        if (error) return res.status(400).json(error);
        // Save the board
        newBoard.save(function (err) {
            if (err) {
                debug('Error in Saving board: ' + err);
                return res.status(400).json(err);
            }
            debug('Board Registration successful');

            Member.findByIdAndUpdate(
                { _id: req.user._id},
                { $push: { idBoards: newBoard._id } },
                function (err) {
                    if (err) return res.status(500).end();
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
router.get('/:id', boardAccess.readRights(), function(req, res) {

    req.query._id = req.params.id;

    Board.findById(req.query, function (err, board) {
        if (err) return res.status(404).end();
        if (!board) return res.status(404).end();
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
router.post('/:id/lists', boardAccess.updateRights(), function(req, res) {

    req.body.idBoard = req.params.id;

    Board.findById(req.params.id, function (err, board) {
        if (err) return res.status(404).end();
        if (!board) return res.status(404).end();
        let newList = new List(req.body);
        // Validate the list
        newList.validate(function (error) {
            if (error) return res.status(400).json(error);
            // Save the board
            newList.save(function (err) {
                if (err) {
                    debug('Error in Saving list: ' + err);
                    throw err;
                }
                debug('List Registration successful');
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
router.get('/:id/lists', boardAccess.readRights(), function(req, res) {

    Board.findById(req.params.id, function (err, board) {
        if (err) return res.status(404).end();
        if (!board) return res.status(404).end();

        req.query.idBoard = board._id;

        List.find(req.query, function(err, list){
            if(err) {
                debug('members/:id error : ' + err)
                return res.status(400).end();
            }
            return res.status(200).json(list)
        });
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
router.put('/:id/members/:idMember', boardAccess.updateRights(), function(req, res) {

    let board = req.board;
    let type = req.query.type ? req.query.type : 'observer';

    if((type === 'admin' && !board.isAdminMember(req.user.id))
        || (type !== 'admin' && board.nbAdmin() <= 1 && req.user.id === req.params.idMember)){
        return res.status(403).send('Forbidden');
    }

    board.createOrUpdateMember(req.params.idMember, type);

    board.validate(function (err) {
        if(err) return res.status(400).send(err);
        board.save(function (err) {
            if(err) return res.status(500).send('Internal error');
            return res.status(200).json(board);
        });
    });
});

module.exports = router;