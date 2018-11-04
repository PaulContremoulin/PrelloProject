let Board = require('./../models/Board');
let List = require('./../models/List');
let debug = require('debug')('app:listAccess');

let findListAndBoard = function(req, res, next) {
    List.findById(req.params.id)
        .populate('idBoard')
        .exec(function (err, list) {
            if (err) debug(err)
            if (!list) return res.status(404).send('Not found');
            if (!list.idBoard) return res.status(404).send('Associate board not found.');
            req.list = list;
            next();
    });
};

let updateRights = function() {
    return function (req, res, next) {
        findListAndBoard(req, res, function () {
            let board = req.list.idBoard;
            let member = req.user.id;
            if (!board.isNormalMember(member) && !board.isAdminMember(member)) return res.status(403).send('Forbidden.');
            req.user.access = true;
            return next();
        });
    }
};

let readRights = function() {
    return function (req, res, next) {
        findListAndBoard(req, res, function () {
            let board = req.list.idBoard;
            let member = req.user.id;
            if (!board.getMember(member)) return res.status(403).send('Forbidden.');
            req.user.access = true;
            return next();
        });
    }
};

module.exports = ListAccess = {
    updateRights : updateRights,
    readRights : readRights
};