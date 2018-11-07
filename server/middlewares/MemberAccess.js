let Member = require('./../models/Member');
let debug = require('debug')('app:memberAccess');

let findMember = function(req, res, next) {
    Member.findById(req.params.id)
        .exec(function (err, member) {
            if (err) debug(err);
            if (!member) return res.status(404).json({message:'Member not found'});
            req.member = member;
            next();
        });
};

let updateRights = function() {
    return function (req, res, next) {
        findMember(req, res, function () {
            if (!req.member._id.equals(req.user.id)) return res.status(403).json({message: 'Forbidden access'});
            next();
        });
    }
};

let readRights = function() {
    return updateRights();
};

module.exports = ListAccess = {
    updateRights : updateRights,
    readRights : readRights
};