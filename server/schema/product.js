'use strict';
var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var productsSchema = new mongoose.Schema({

		dateCreated : {type : Date, default: Date.now},
		name : {type : String , unique: true},
		desc : {type : String},
		qtty : {type: Number},
		price : {type: Number},
		cat : {type: String},
		user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	});
	app.db.model('Product' ,productsSchema);
};
