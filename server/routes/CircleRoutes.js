let express = require('express');
let router = express.Router();
let Circle = require('./../models/Circle');
let debug = require('debug')('app:circles');
let token = require('./../middlewares/TokenAccess');
let circleAccess = require('./../middlewares/CircleAccess');
let mongoose = require('mongoose');

/**
 * Get circle
 * @route GET /circles/{id}
 * @group circles - Operations about circles
 * @returns {Circle} 200 - Circle's board
 * @returns {Error}  401 - Unauthorized, user not authenticate
 * @returns {Error}  403 - Forbidden, Forbidden access for this credentials
 * @returns {Error}  404 - Circle not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/:id', token, circleAccess.readRights(), function(req, res) {
    return res.status(200).json(req.circle);
});

/**
 * Add a board to circle
 * @route POST /circles/{id}/boards
 * @group circles - Operations about circles
 * @returns {Circle} 200 - Circle's board
 * @returns {Error}  401 - Unauthorized, user not authenticate
 * @returns {Error}  403 - Forbidden, Forbidden access for this credentials
 * @returns {Error}  404 - Circle not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/:id/boards', token,  circleAccess.updateRights(), function(req, res) {

    if(!mongoose.Types.ObjectId.isValid(req.query.idBoard))
        return res.status(400).json({message:'Board\'s id missing or wrong'});

    let circle = req.circle;
    circle.addBoard(req.query.idBoard);
    circle.validate(function(err){
       if(err) return res.status(400).json({message:err});
       circle.save(function(err){
           if(err) {
               debug(err);
               return res.status(500).json({message:'Unexpected internal error'});
           }
           return res.status(201).json(circle);
       });
    });
});

/**
 * Remove a board to circle
 * @route DELETE /circles/{id}/boards/{idBoard}
 * @group circles - Operations about circles
 * @param {string} id.path.required - Circle's id
 * @param {string} idBoard.path.required - Board's id to remove
 * @returns {Circle} 200 - Board deleted successfully
 * @returns {Error}  401 - Unauthorized, user not authenticate
 * @returns {Error}  403 - Forbidden, Forbidden access for this credentials
 * @returns {Error}  404 - Circle not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.delete('/:id/boards/:idBoard', token, circleAccess.updateRights(), function(req, res) {

    if(!mongoose.Types.ObjectId.isValid(req.params.idBoard))
        return res.status(400).json({message:'Board\'s id missing or wrong'});

    let circle = req.circle;
    circle.removeBoard(req.params.idBoard);
    circle.validate(function(err){
        if(err) return res.status(400).json({message:err});
        circle.save(function(err){
            if(err) return res.status(500).json({message:'Unexpected internal error'});
            return res.status(200).json({'message' : 'Board deleted successfully'});
        });
    });

});

/**
 * Remove a circle
 * @route DELETE /circles/{id}
 * @group circles - Operations about circles
 * @param {string} id.param.required - Circle's id to remove
 * @returns {Circle} 200 - Circle deleted successfully
 * @returns {Error}  401 - Unauthorized, user not authenticate
 * @returns {Error}  403 - Forbidden, Forbidden access for this credentials
 * @returns {Error}  404 - Circle not found
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.delete('/:id', token,  circleAccess.updateRights(), function(req, res) {
    let circle = req.circle;
    circle.remove();
    circle.save(function(err){
        if(err) return res.status(500).json({message:'Unexpected internal error'});
        return res.status(200).json({'message' : 'Circle deleted successfully'});
    });
});

module.exports = router;