var config = require('../../config/config.js');
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = function (app){
    app.use('/register', router);
}

router.post('/', function(req, res, next){
    var saltRounds = 10;
    if(req.body.password === undefined ||req.body.password.length < 8){
        console.log(req.body.password);
         console.log("REGISTER");
        return next({status: 422, message: "Password is mandatory and must be at least 8 characters long"});
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        if(err){
            return next(err);
        }
        
        console.log( "lastName: " + req.body.lastName);
        console.log( "firstName: " + req.body.firstName);

        var newUser = new User(req.body);
        newUser.password = hash;
        newUser.save(function(err, doc, n){
            if(err){
                console.log(err);
                if(err.name === "ValidationError"){
                    return next({status: 422, message: "Invalid user data"});
                }else if(err.name === "MongoError" && err.message.startsWith("E11000 duplicate key")){
                    return next({status: 422, message: "Username is already available"});
                }else{
                    return next(err);
                }
            }
            return res.status(201).set('Access-Control-Expose-Headers', 'Location').location('/users/' + newUser._id).end();
        });
    });
});

  router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message});
  });