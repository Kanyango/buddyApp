'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var supplierSchema = new mongoose.Schema({

		user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		name : {type : String},
		phone: {type : Number , unique: true},
		email: {type : String},
		address: {type : Number},
		createdOn : {type: Date , default: Date.now()},
		product : {type : String}
	});
	app.db.model('Supplier' , supplierSchema);
};