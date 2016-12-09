
// Database init script for testing

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://coolapp_mongo:27017/mongodb://localhost:27017/project-final-tests-development';
var data = require('./test_data');

MongoClient.connect(url, function(err, db) {
	if (err) {
		return console.dir(err);
	}

	// add datas
	db.collection('users').insertOne(data);

	db.close();
});
