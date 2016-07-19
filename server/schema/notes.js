'use strict';

module.exports = function(app , mongoose){

	var notesSchema = new mongoose.Schema({
		
        user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		date        : {type : Date , default: Date.now()},
		note        : {type: String},
		customer    : {type: String}
	});
	app.db.model('Sales' , salesSchema);
};