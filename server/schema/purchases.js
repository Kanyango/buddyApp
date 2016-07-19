'use strict';

var mongoose  = require('mongoose');

module.exports = function(app , mongoose)
{
	var purchSchema = new mongoose.Schema({
		date        : {type: Date , default: Date.now},
		user        : {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
		product     : String,
		qtty        : Number,
		amount      : Number,
		supplier    : String,
	    total       : Number
	});
	app.db.model('Purchase', purchSchema);
};