let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let Member = require('./../models/Member');
let debug = require('debug')('app:members');
let mongoose = require('mongoose');

/**
 * This function comment is parsed by doctrine
 * @route GET /members/{id}
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @returns {Member.model} 200 - Member's information
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', function(req, res) {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).end();
    }

    Member.findById(req.params.id, function (err, member) {
        if(err) {
            debug('members/:id error : ' + err)
            return res.status(404).end();
        }
        if(!member) return res.status(404).end();
        return res.status(200).json(member);
    });

});


/**
 * This function comment is parsed by doctrine
 * @route GET /members/{id}/boards
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @param {string} name.query - board name
 * @returns {Array.<Board>} 200 - List of member's boards
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/boards', function(req, res) {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).end();
    }

    Member.findById(req.params.id, function (err, member) {
        if(err) {
            debug('members/:id error : ' + err)
            return res.status(500).end();
        }
        if(!member) return res.status(404).end();

        req.query._id = { $in: member.idBoards};

        Board.find(req.query, function(err, board){
                if(err) {
                    debug('members/:id error : ' + err)
                    return res.status(500).end();
                }
                return res.status(200).json(board)
            });

    });

});

module.exports = router;
