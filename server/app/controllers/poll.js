var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Poll = mongoose.model('Poll');
var Question = mongoose.model('Question');
var bcrypt = require('bcrypt');
var passport = require('../../config/passport.js');
var realtime = require('../realtime/realtime.js')

module.exports = function (app){
    app.use('/api', router);
}

var authenticate = passport.authenticate("jwt", {session: false}) ;//router.use(passport.authenticate("jwt", {session: false}));

router.post('/poll', authenticate,function(req, res, next){
    var saltRounds = 10;
    
    if(req.body.title === undefined){
        console.log(req.body.title);
        return next({status: 422, message: "poll title is mandatory"});
    }
    var newPoll = new Poll(req.body);
    newPoll.save(function(err, doc, n){
        if(err){
            console.log(err);
            if(err.name === "ValidationError"){
                return next({status: 422, message: "Invalid poll"});
            }else{
                return next(err);
            }
        }
        realtime.notifyPoll(newPoll.toJSON());
        return res.status(201).location('/api/polls/' + newPoll._id).end();
    });
});

var pollProjection = { 
    __v: false
};

router.get('/polls', authenticate, function(req, res, next){
    Poll.find({}, pollProjection, function(err, polls){
        if(err) return next(err);
        res.json(polls);
    });
});

router.get('/polls/:id', function(req, res, next){
    var id = req.params["id"];
    Poll.findOne({_id: id}, function(err, poll){
        console.log("In Poll Find One" );
        if(err) return next(err);
        Question.find({poll: poll._id}, function(err, question){
             var questionJson = JSON.stringify(question);
             var finalPoll = {
                 "title" : poll.title,
                 "questions" : question
             }
             res.json(finalPoll);

        } );
    });
});


  router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message});
  });