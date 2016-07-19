'use strict';

module.exports = function(app , mongoose){

	var salesSchema = new mongoose.Schema({
		
        user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		date        : {type : Date },
		item        : String,
		customer    : String,
        qtty        : {type: Number},
        amount      : Number, 
        total       : Number 
	});
	app.db.model('Sales' , salesSchema);
};