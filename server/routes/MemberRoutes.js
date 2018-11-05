let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let Member = require('./../models/Member');
let debug = require('debug')('app:members');
let mongoose = require('mongoose');
const passport = require('passport');

/**
 * Get the member attached at the id given
 * @route GET /members/{id}
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @returns {Member.model} 200 - Member's information
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {

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
 * Get all member's boards for the member's id given
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
router.get('/:id/boards', passport.authenticate('jwt', { session: false }), function(req, res) {

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

/**
 * The the member's password with the new password given, if the token is valid
 * @route POST /members/{id}/password/reset
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @param {string} token.query.required - reset token id
 * @param {string} password.body.required - the new user password
 * @returns {code} 200 - Password reset successfully
 * @returns {Error}  400 - Bad request, invalid request
 * @returns {Error}  403 - Forbidden, token expired
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/password/reset', function(req, res) {

    if(!req.query.token) return res.status(400).send('No token given.');
    if(!req.body.password) return res.status(400).send('No password given.');

    Member.findById({ _id : req.params.id, resetPass : { token : req.query.token }}, function (err, member) {
        if(err) debug('members/:id/password/reset error : ' + err);
        if(!member) return res.status(404).end();

        if(member.resetPass.expire < Math.floor(Date.now() / 1000)) return res.status(403).send('Reset password token expired.');

        member.setPassword(req.body.password);

        member.validate(function (err) {
            if(err) return res.status(400).send(err);
            // save the user
            member.save(function (err) {
                if (err) {
                    debug('Error in Saving user: ' + err);
                    throw err;
                }
                return res.status(200).end();
            });
        });
    });
});

/**
 * Check if the token given is valid
 * @route GET /members/{id}/password/reset
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @param {string} token.query.required - reset token id
 * @returns {code} 200 - Valid token
 * @returns {Error}  400 - Bad request, token no provided
 * @returns {Error}  403 - Forbidden, token expired or not exist
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/password/reset', function(req, res) {
    if(!req.query.token) return res.status(400).send('No token given.');
    Member.findById({ _id : req.params.id, loginType: "password", resetPass : { token : req.query.token }}, function (err, member) {
        if(err) {
            debug('members/:id/password/reset error : ' + err)
            return res.status(500).end();
        }
        if(!member) return res.status(404).end('No member found + ');
        if(member.resetPass.expire < Math.floor(Date.now() / 1000)) return res.status(403).send('Reset password token expired.');
        return res.status(200).end();
    });
});

/**
 * Confirm the email address and redirect on the callback given if provided
 * @route GET /members/{id}/email/confirm
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @param {string} token.query.required - confirm email token
 * @param {string} callback.query - callback url to redirect the user
 * @returns {code} 200 - Email confirmed successfully
 * @returns {code} 301 - Email confirmed successfully and redirect in the client application callback
 * @returns {Error}  400 - Bad request, token no provided
 * @returns {Error}  403 - Forbidden, token expired, invalid or user already confirmed his/her email
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/email/confirm', function(req, res) {
    if(!req.query.token) return res.status(400).send('No token given.');
    Member.findOne({_id : req.params.id}, function (err, member) {
        if(err) {
            debug('members/:id/email/confirm error : ' + err);
            return res.status(500).end();
        }
        if(!member) return res.status(404).end();
        if(member.confirmed || !member.tokenConfirm) return res.status(403).send('User already confirmed his/her email address');
        if(member.tokenConfirm !== req.query.token) return res.status(403).send('Invalid token.');

        member.set('confirmed', true);
        member.set('tokenConfirm', undefined);

        member.validate(function (err) {
            if (err) {
                debug('members/:id/email/confirm error : ' + err);
                return res.status(500).end();
            }
            // save the user
            member.save(function (err) {
                if (err) {
                    debug('Error in Saving user: ' + err);
                    throw err;
                }
                debug('User email confirmed successfully');
                if(req.query.callback) return res.redirect(req.query.callback);
                return res.status(200).send('Email confirmed successfully');
            });
        });
    });
});


module.exports = router;
