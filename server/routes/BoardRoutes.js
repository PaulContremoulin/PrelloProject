let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let debug = require('debug')('app:board');

/**
 * @typedef NewBoard
 * @property {string} name.required - the board's name
 * @property {string} color.required - the board's color like #123456
 */

/**
 * @typedef Board
 * @property {string} _id.required - the board's id
 * @property {string} name.required - the board's name
 * @property {string} color.required - the board's color
 * @property {string} creator.required - the board's creator
 * @property {string} lists.required - the board's lists (empty)
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /boards
 * @group board - Operations about boards
 * @param {NewBoard.model} board.body.required - board's information.
 * @returns {Board} 201 - Board created
 * @returns {Error}  400 - bad request, one of fields is invalid
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/', function(req, res) {

    let newBoard = new Board({
        name: req.body.name,
        color: req.body.color,
        creator: req.user._id
    });

    // Validate the board
    newBoard.validate(function (error) {
        if (error) {
            return res.status(400).json(error);
        }
        // Save the board
        newBoard.save(function (err) {
            if (err) {
                debug('Error in Saving board: ' + err);
                throw err;
            }
            debug('Board Registration successful');
            return res.status(201).json(newBoard);
        });
    });
});

/**
 * This function comment is parsed by doctrine
 * @route GET /boards/{id}
 * @group board - Operations about boards
 * @param {string} id.path.required - board's id.
 * @returns {Board} 200 - Board object
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found, board is not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', function(req, res) {

    // Validate the board
    Board.findById(req.params.id, function (err, board) {
        if (err) return res.status(404).end();
        if (!board) return res.status(404).end();
        res.status(200).json(board);
    });
});

module.exports = router;