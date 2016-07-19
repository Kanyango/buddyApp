'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var expensesSchema = new mongoose.Schema({

		user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		date : {type: Date},
		expType : {type: String},
		amount : {type: Number}
	});
	app.db.model('Expenses' ,expensesSchema);
};