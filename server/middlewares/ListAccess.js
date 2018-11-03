let Board = require('./../models/Board');
let Member = require('./../models/Member');
let List = require('./../models/List');
let debug = require('debug')('app:listAccess');

let canUpdate = function() {
    return function(req, res, next) {
        List.findById(req.params.id, function(err, list) {
            if(err) return res.status(404).send('Not found');
            if(!list) return res.status(404).send('Not found');

            Board.findOne({'_id' : list.idBoard, 'memberships.idMember' : req.user.id},
                {'memberships.$': 1}, (err, board) => {
                if(err) debug(err);
                if(!board || !board.memberships[0]) return res.status(403).send('Forbidden.');
                let member = board.memberships[0];
                if(!member || (member.memberType !== 'admin' && member.memberType !== 'normal')){
                    return res.status(403).send('Forbidden.');
                }
                req.list = list;
                req.user.access = member;
                return next();
            })
        });
    };
};

let canRead = function() {
    return function(req, res, next) {
        List.findById(req.params.id, function(err, list) {
            if(err) return res.status(404).send('Not found');
            if(!list) return res.status(404).send('Not found');

            Board.findOne({'_id' : list.idBoard,'memberships.idMember' : req.user.id},
                {'memberships.$': 1}, (err, board) => {
                    if(err) debug(err);
                    if(!board || !board.memberships[0]) return res.status(403).send('Forbidden.');
                    let member = board.memberships[0];
                    if(!member || (member.memberType !== 'admin' && member.memberType !== 'normal' && member.memberType !== 'observer')){
                        return res.status(403).send('Forbidden.');
                    }
                    req.list = list;
                    req.user.access = member;
                    return next();
                })
        });
    };
};

module.exports = ListAccess = {
    canUpdate : canUpdate,
    canRead : canRead
};