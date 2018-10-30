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
 * @typedef BoardCreated
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
 * @returns {BoardCreated} 201 - Board created
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

module.exports = router;