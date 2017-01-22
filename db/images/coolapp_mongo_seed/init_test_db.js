
// Database init script for testing

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://coolapp_mongo:27017/coolapp-tests-development';
var data = require('./test_data');

MongoClient.connect(url, function(err, db) {
	if (err) {
		return console.dir(err);
	}

	// add data
	db.collection('users').insertOne(data);

	db.close();
});
