'use strict';

module.exports = function(app , mongoose)
{
	var customerSchema = new mongoose.Schema({

		name : {type: String },
		user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		phone : {type:Number , unique: true},
		email : String,
		address: String,
		notes : [{type: mongoose.Schema.Types.ObjectId, ref: 'Notes'}],
		invoices : [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}],
		payments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}]
	});
	app.db.model('Customer' , customerSchema);
};