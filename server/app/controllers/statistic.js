var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Statistic = mongoose.model('Statistic');
var bcrypt = require('bcrypt');
var passport = require('../../config/passport.js');
var realtime = require('../realtime/realtime.js')

module.exports = function (app){
    app.use('/api', router);
}

var authenticate = passport.authenticate("jwt", {session: false});//router.use(passport.authenticate("jwt", {session: false}));


var statisticsProjection = { 
    __v: false
};
router.get('/statistics', authenticate,function(req, res, next){
    Statistic.find({}, statisticsProjection, function(err, questions){
        if(err) return next(err);
        res.json(questions);
    });
});

router.get('/statistics/:question_id', authenticate,function(req, res, next){
    var question_id = req.params["question_id"];
    console.log("GET api/statistics/" + question_id);
    Statistic.findOne({question: question_id}, statisticsProjection, function(err, statistic){
        if(err) return next(err);
        res.json(statistic);
    });
});
