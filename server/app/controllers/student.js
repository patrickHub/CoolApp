var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Student = mongoose.model('Student');
var Question = mongoose.model('Question');
var Poll = mongoose.model('Poll');
var bcrypt = require('bcrypt');
var passport = require('../../config/passport.js');
var realtime = require('../realtime/realtime.js');

module.exports = function (app){
    app.use('/api', router);
}

router.post('/student/register', function(req, res, next){
    
    if(req.body.fullName === undefined){
        return next({status: 422, message: "student fullName is mandatory"});
    }

    var newStudent = new Student(req.body);
    newStudent.save(function(err, doc, n){

        if(err){
                console.log(err);
                if(err.name === "ValidationError"){
                    return next({status: 422, message: "Invalid student data"});
                }else if(err.name === "MongoError" && err.message.startsWith("E11000 duplicate key")){
                    return next({status: 422, message: "the fullName is already available"});
                }else{
                    return next(err);
                }
            }
        return res.status(201).set('Access-Control-Expose-Headers', 'Location').location('/api/student/' + newStudent._id).end();
       // realtime.notifyAnswer(newStudent.toJSON());
        return res.status(201).location('/api/student/' + newStudent._id).end();
    });
});

router.post('/student/auth', function(req, res, next){

    var fullName = req.body.fullName;
    if(fullName === undefined){
        return next({status: 401, message: "Please provide credentials"});
    }

    Student.findOne({
        'fullName': fullName
    })
    .then(function(user){
        console.log("Fulname : " + fullName);
        if(user === null){
            return next({status: 401, message: "student does not exist"});
        }
        res.json(user._id);
    })
    .catch(function(error){
        console.log("Error: " + error);
        return next({status: 401, message: error.message});
    });
});

router.get('/student/:id', function(req, res, next){
    var id = req.params["id"];
    Student.find({_id: id}, function(err, student){
        if(err) return next(err);
        res.json(student);
    });
});

var questionsProjection = { 
    __v: false,
    'choices.isAnswer' : false
};
var pollProjection = { 
    __v: false
};
router.get('/students/questions/:poll_id', function(req, res, next){
    var poll_id = req.params["poll_id"];
    Question.find({poll: poll_id, isAnswered: false}, questionsProjection, function(err, questions){
        if(err) return next(err);
        res.json(questions);
    });
});

router.get('/students/polls', function(req, res, next){
    Poll.find({}, pollProjection, function(err, polls){
        if(err) return next(err);
        res.json(polls);
    });
});

router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message});
  });
