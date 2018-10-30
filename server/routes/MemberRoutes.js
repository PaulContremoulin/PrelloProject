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
 * @returns {Object} 200 - Member's information
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
        return res.status(200).json(member.toPublic());
    });

});


/**
 * This function comment is parsed by doctrine
 * @route GET /members/{id}/boards
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @returns {Object} 200 - List of member's boards
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
        Board.find({ creator: member._id}, function (err, boards) {
            if(err) {
                debug('members/:id/boards error : ' + err)
                return res.status(500).end();
            }
            return res.status(200).json(boards)
        });
    });

});

module.exports = router;
