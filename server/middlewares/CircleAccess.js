let Circle = require('./../models/Circle');
let debug = require('debug')('app:circleAccess');

let findCircle = function(req, res, next) {
    Circle.findById(req.params.id)
        .populate('idMember')
        .exec(function (err, circle) {
            if (err) debug(err);
            if (!circle) return res.status(404).json({message:'Circle not found'});
            if (!circle.idMember) return res.status(404).json({message:'Associate member not found'});
            req.circle = circle;
            next();
        });
};

let updateRights = function() {
    return function (req, res, next) {
        findCircle(req, res, function () {
            let circle = req.circle;
            if (!circle.idMember.equals(req.user.id)) return res.status(403).json({message:'Forbidden access'});
            req.user.access = true;
            return next();
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