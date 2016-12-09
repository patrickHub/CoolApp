var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Answer = mongoose.model('Answer');
var bcrypt = require('bcrypt');
var passport = require('../../config/passport.js');
var realtime = require('../realtime/realtime.js');

module.exports = function (app){
    app.use('/api', router);
}

router.use(passport.authenticate("jwt", {session: false}));

router.post('/answer', function(req, res, next){
    
    if(req.body.choice_id === undefined){
        console.log(req.body.choice_id);
        return next({status: 422, message: "answer choice_id is mandatory"});
    }
    if(req.body.question_id === undefined){
        console.log(req.body.question_id);
       return next({status: 422, message: "answer question_id is mandatory"});
    }
    if(req.body.user_id === undefined){
        console.log(req.body.user_id);
        return next({status: 422, message: "answer user_id is mandatory"});
    }
    if(req.body.room === undefined){
        console.log(req.body.room);
        return next({status: 422, message: "answer room is mandatory"});
    }

    var newAnswer = new Answer(req.body);
    newAnswer.save(function(err, doc, n){
        if(err){
            console.log(err);
            if(err.name === "ValidationError"){
                return next({status: 422, message: "Invalid answer data"});
            }else{
                return next(err);
            }
        }
        realtime.notifyAnswer(newAnswer.toJSON());
        return res.status(201).location('/api/answer/' + newAnswer._id).end();
    });
});

router.get('/answers/:id', function(req, res, next){
    var id = req.params["id"];
    Answer.find({ question_id: id}, function(err, answer){
        if(err) return next(err);
        res.json(answer);
    });
});

router.get('/answer/:id', function(req, res, next){
    var id = req.params["id"];
    console.log("GET api/answer/_id" + id);
    Answer.findOne({_id: id}, function(err, answer){
        if(err) return next(err);
        res.json(answer);
    });
});
