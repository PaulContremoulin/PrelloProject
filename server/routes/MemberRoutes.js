let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let Member = require('./../models/Member');
let Circle = require('./../models/Circle');
let debug = require('debug')('app:members');
let mongoose = require('mongoose');
let token = require('./../middlewares/TokenAccess');

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
router.get('/:id', token, function(req, res) {

    Member.findById(req.params.id, function (err, member) {
        if(err) debug('members/:id error : ' + err)
        if(!member) return res.status(404).json({ message:'Member not found'});
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
router.get('/:id/boards', token, function(req, res) {

    Member.findById(req.params.id, function (err, member) {
        if (err) debug('members/:id error : ' + err);
        if (!member) return res.status(404).end();

        req.query._id = {$in: member.idBoards};

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
 * Add a circle
 * @route POST /members/{id}/circles
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @param {Circle} circle.body.required - the circle to add
 * @returns {Circle} 201 - Circle created successfully
 * @returns {Error}  400 - Bad request, token no provided
 * @returns {Error}  403 - Forbidden, token expired or not exist
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/circles', passport.authenticate('jwt', { session: false }), function(req, res) {

    Member.findById(req.params.id, function (err, member) {
        if(err) debug('members/:id/circles error : ' + err);
        if(!member) return res.status(404).end();

        let circle = new Circle({
            name : req.body.name,
            idMember : mongoose.Types.ObjectId(req.user.id)
        });

        circle.validate(function (err) {
            if(err) return res.status(400).send(err);
            // save the circle
            circle.save(function (err) {
                if (err) {
                    debug('members/:id/circles error : ' + err);
                    return res.status(500).end();
                }
                return res.status(200).json(circle);
            });
        });
    });
});

/**
 * Get user's circles
 * @route GET /members/{id}/circles
 * @group members - Operations about members
 * @returns {Circle} 200 - User's circle
 * @returns {Error}  403 - Forbidden, token expired or not exist
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/circles', passport.authenticate('jwt', { session: false }), function(req, res) {

    Circle.find({ idMmeber : req.params.id }, function (err, circle) {
        if(err) debug('members/:id/circles error : ' + err);
        if(!circle) return res.status(404).end();
        return res.status(200).json(circle);
    });
});

/**
 * Get user's circles
 * @route GET /members/{id}/circles
 * @group members - Operations about members
 * @returns {Circle} 200 - User's circle
 * @returns {Error}  403 - Forbidden, token expired or not exist
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/circles', token, function(req, res) {
    Circle.find({ idMember : req.params.id }, function (err, circle) {
        if(err) debug('members/:id/circles error : ' + err);
        if(!circle)
            return res.status(404).json({message : "Member not found."});
        else
            return res.status(200).json(circle);
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

    if(!req.query.token) return res.status(400).json({message :'Token is missing'});
    if(!req.body.password) return res.status(400).json({message :'Password is missing'});

    Member.findOne({ _id : req.params.id, loginType : "password", 'resetPass.token' : req.query.token}
    , function (err, member) {
        if(err) debug('members/:id/password/reset error : ' + err);
        if(!member)
            return res.status(404).json({message :'Member is not found'});
        if(member.passwordTokenExpired())
            return res.status(403).json({message :'Expired password reset token'});
        if(!member.setPassword(req.body.password))
            return res.status(400).json({message :'The password given is invalid. (Minimum eight characters, at least one letter, one number and one special char'});

        member.set('resetPass', undefined);

        member.validate(function (err) {
            if(err) return res.status(400).json({message : err._message});
            member.save(function (err) {
                if (err) {
                    debug('Error in Saving user: ' + err);
                    return res.status(500).json({message : 'Unexpected internal server error'});
                }
                return res.status(200).json({massage:'Password has been reset successfully'});
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
    if(!req.query.token)
        return res.status(400).json({message : 'Token is missing'});
    Member.findOne({ _id : req.params.id, loginType : "password", 'resetPass.token' : req.query.token }, function (err, member) {
        if(err)
            debug('members/:id/password/reset error : ' + err)
        if(!member)
            return res.status(404).json({message:'Member not found'});
        if(member.passwordTokenExpired())
            return res.status(403).json({message:'Expired password reset token'});
        else
            return res.status(200).json({message:'Valid password reset token'});
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
    if(!req.query.token)
        return res.status(400).json({message : 'Token missing'});
    Member.findById(req.params.id, function (err, member) {
        if(err)
            debug('members/:id/email/confirm error : ' + err);
        if(!member)
            return res.status(404).json({message : 'Member not found'});
        if(member.confirmed || !member.tokenConfirm)
            return res.status(403).json({message : 'User already confirmed his/her email address'});
        if(member.tokenConfirm !== req.query.token)
            return res.status(403).json({message : 'Token given invalid'});

        member.set('confirmed', true);
        member.set('tokenConfirm', undefined);

        member.validate(function (err) {
            if(err) return res.status(400).json({message : err._message});

            member.save(function (err) {
                if (err) {
                    debug('members/:id/email/confirm error : ' + err);
                    return res.status(500).json({message : 'Unexpected internal server error'});
                }
                if(req.query.callback)
                    return res.redirect(req.query.callback);
                else
                    return res.status(200).json({message : 'Email successfully confirmed'});
            });
        });
    });
});


module.exports = router;
