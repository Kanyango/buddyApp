'use strict'

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var settingsSchema = new mongoose.Schema({

		user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		name : String,
		email : String,
		phone   : String,
		bizName : String, 
		industry : String,
		location : String,
		address : String,
		oContact : String,
		website : String
	});
	app.db.model('Setting' , settingsSchema);
};