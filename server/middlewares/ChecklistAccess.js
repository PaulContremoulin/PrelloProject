let Checklist = require('./../models/Checklist');
let debug = require('debug')('app:listAccess');

let findChecklist = function(req, res, next) {

    Checklist.findById(req.params.id)
        .populate('idBoard', '_id memberships')
        .exec(function (err, checklist) {
            if (err) debug(err);
            if (!checklist) return res.status(404).json({message:'Checklist not found'});
            if (!checklist.idBoard) return res.status(500).json({message:'Unexpected internal error'});
            req.checklist = checklist;
            return next();
        });
};

let readRights = function() {
    return function (req, res, next) {
        findChecklist(req, res, function () {
            let board = req.checklist.idBoard;
            let member = req.user.id;
            if (!board.getMember(member))
                return res.status(403).json({message:'Forbidden access'});
            req.user.access = true;
            return next();
        });
    }
};


let updateRights = function() {
    return function (req, res, next) {
        findChecklist(req, res, function () {
            let board = req.checklist.idBoard;
            let member = req.user.id;
            if (!board.isNormalMember(member) && !board.isAdminMember(member))
                return res.status(403).json({message:'Forbidden access'});
            req.user.access = true;
            return next();
        });
    }
};

module.exports = ChecklistAccess = {
    readRights : readRights,
    updateRights : updateRights
};