var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Question = mongoose.model('Question');
var bcrypt = require('bcrypt');
var passport = require('../../config/passport.js');
var realtime = require('../realtime/realtime.js')

module.exports = function (app){
    app.use('/api', router);
}

router.use(passport.authenticate("jwt", {session: false}));

router.post('/question', function(req, res, next){
    var saltRounds = 10;
    
    if(req.body.description === undefined){
        console.log(req.body.description);
        return next({status: 422, message: "question description is mandatory"});
    }
    if(req.body.choices.length < 2){
        console.log(req.body.choices);
       return next({status: 422, message: "a question should have a least 2 choices"});
    }
    if(req.body.room === undefined){
        console.log(req.body.room);
        return next({status: 422, message: "question room is mandatory"});
    }

    var newQuestion = new Question(req.body);
    newQuestion.save(function(err, doc, n){
        if(err){
            console.log(err);
            if(err.name === "ValidationError"){
                return next({status: 422, message: "Invalid question data"});
            }else{
                return next(err);
            }
        }
        realtime.notifyQuestion(newQuestion.toJSON());
        return res.status(201).location('/api/questions/' + newQuestion._id).end();
    });
});


var questionsProjection = { 
    __v: false,
    answer: false,
    'choices.isAnswer' : false
};

router.get('/questions', function(req, res, next){
    Question.find({}, questionsProjection, function(err, questions){
        if(err) return next(err);
        res.json(questions);
    });
});

router.get('/questions/:id', function(req, res, next){
    var id = req.params["id"];
    console.log("GET api/questions/" + id);
    Question.findOne({_id: id}, questionsProjection, function(err, question){
        if(err) return next(err);
        res.json(question);
    });
});