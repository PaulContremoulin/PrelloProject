let express = require('express');
let router = express.Router();
let Board = require('./../models/Board');
let Member = require('./../models/Member');
let Circle = require('./../models/Circle');
let debug = require('debug')('app:members');
let mongoose = require('mongoose');
let token = require('./../middlewares/TokenAccess');
let memberAccess = require('./../middlewares/MemberAccess');

/**
 * Get the member attached at the id given
 * @route GET /members/{id}
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @returns {Member.model} 200 - Member's information
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', token, memberAccess.readRights(), function(req, res) {

    Member.findById(req.params.id, function (err, member) {
        if(err) debug('members/:id error : ' + err)
        if(!member) return res.status(404).json({ message:'Member not found'});
        return res.status(200).json(member);
    });

});

/**
 * Get the public profil of a member
 * @route GET /members/{id}/public
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @returns {Member.model} 200 - Member's information
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id/public', token, function(req, res) {

    Member.findById(req.params.id,
        { username : 1, lastName : 1, firstName : 1, email : 1, organization : 1},
        function (err, member) {
        if(err) debug('members/:id error : ' + err)
        if(!member) return res.status(404).json({ message:'Member not found'});
        return res.status(200).json(member);
    });

});

/**
 * Update the member
 * @route PUT /members/{id}
 * @group members - Operations about members
 * @param {string} id.path.required - member's id
 * @param {string} lastName.query - member's lastName
 * @param {string} firstName.query - member's firstName
 * @param {string} organization.query - member's organization
 * @returns {Code} 200 - Member deleted
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id', token, memberAccess.updateRights(), function(req, res) {

    let member = req.member;

    (req.query.lastName) ? member.lastName = req.query.lastName : null;
    (req.query.firstName) ? member.firstName = req.query.firstName : null;
    (req.query.organization) ? member.organization = req.query.organization : null;
    (req.query.bio) ? member.bio = req.query.bio : null;

    member.validate( (err) => {
        if(err) return res.status(400).json({message : err});
        member.save( (err) => {
            if(err) return res.status(500).json({message : 'Unexpected internal error'});
            return res.status(200).json({message : 'Member successfully updated'});
        });
    });

});

/**
 * Delete the member
 * @route DELETE /members/{id}
 * @group members - Operations about members
 * @param {string} id.path.required - member's id
 * @returns {Code} 200 - Member deleted
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.delete('/:id', token, memberAccess.updateRights(), function(req, res) {

    let member = req.member;

    member.remove()
    member.save( (err) => {
        if(err) return res.status(500).json({message : 'Unexpected internal error'});
        return res.status(200).json({message : 'Password successfully updated'});
    });

});

/**
 * Update the member's password
 * @route PUT /members/{id}/password
 * @group members - Operations about members
 * @param {string} id.path.required - member's id.
 * @param {string} oldPassword.body.required - member's old password
 * @param {string} newPassword.body.required - member's new password
 * @returns {Member.model} 200 - Member's password updated
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  403 - Forbidden access
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put('/:id/password', token, memberAccess.updateRights(), function(req, res) {

    if(!req.body.oldPassword || !req.body.newPassword ) return res.status(400).json({message : 'Old password field or new password field missing'});
    let member = req.member;
    if(!member.validPassword(req.body.oldPassword)) return res.status(400).json({message : 'old password isn\'t valid'});
    if(!member.setPassword(req.body.newPassword)) return res.status(400).json({message : 'new password isn\'t valid'});

    member.save( (err) => {
       if(err) return res.status(500).json({message : 'Unexpected internal error'});
       return res.status(200).json({message : 'Password successfully updated'});
    });

});

/**
 * Get all members for keywords given on the username field
 * @route GET /members/search/{keywords}
 * @group members - Operations about members
 * @param {string} keywords.path.required - username to search.
 * @returns {Array.<String>} 200 - Member's information (limit to 10 members)
 * @returns {Error}  401 - Unauthorized, invalid credentials
 * @returns {Error}  404 - Not found if the user doesn't exist
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/search/:keywords', token, function(req, res) {

    Member.find(
        {username : new RegExp('.*'+req.params.keywords+'.*', "i")},
        {username : 1, _id : 1, email: 1})
        .limit(10)
        .exec(function (err, member) {
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
router.get('/:id/boards', token, memberAccess.readRights(), function(req, res) {

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
 * @param {string} name.param.required - circle's name.
 * @returns {Circle} 201 - Circle created successfully
 * @returns {Error}  400 - Bad request, token no provided
 * @returns {Error}  403 - Forbidden, token expired or not exist
 * @returns {Error}  404 - Member not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/circles', token, memberAccess.updateRights(), function(req, res) {

    if(!req.query.name) return res.status(400).json({message:'Name is missing'});

    Member.findById(req.params.id, function (err, member) {
        if(err) debug('members/:id/circles error : ' + err);
        if(!member) return res.status(404).end();

        let circle = new Circle({
            name : req.query.name,
            idMember : mongoose.Types.ObjectId(req.user.id)
        });

        circle.validate(function (err) {
            if(err) return res.status(400).json({message:err});
            // save the circle
            circle.save(function (err) {
                if (err) {
                    debug('members/:id/circles error : ' + err);
                    return res.status(500).end();
                }
                return res.status(201).json(circle);
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
router.get('/:id/circles', token, memberAccess.readRights(), function(req, res) {
    Circle.find({ idMember : req.params.id }, function (err, circle) {
        if(err) debug('members/:id/circles error : ' + err);
        if(!circle)
            return res.status(404).json({message : "Member not found."});
        else
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
            if(err) return res.status(400).json({message : err});
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
            if(err) return res.status(400).json({message : err});
            member.save(function (err) {
                if (err) {
                    debug('members/:id/email/confirm error : ' + err);
                    return res.status(500).json({message : 'Unexpected internal server error'});
                }
                return res.redirect('/login');
            });
        });
    });
});


module.exports = router;
