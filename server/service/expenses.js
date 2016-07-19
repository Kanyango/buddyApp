'use strict';

var mongoose = require('mongoose');

var expense = {

	create : function(req , res , next)
	{
		var fieldsToSet = {

			user : req.payload._id,
			date : req.body.date,
			expType : req.body.type,
			amount : req.body.amount
		};

		req.app.db.models.Expenses.create(fieldsToSet , function(err , info){

			if(err)
			{
				return next(err);
			}

			res.status(200).json(info)
		});

	},
	read : function(req , res , next)
	{

		req.app.db.models.Expenses.find({user : req.payload._id},
			function(err , info){
				if(err)
				{
					return next(err);
				}

				res.status(200).json(info)
			});

	},
	view : function(req , res , next)
	{
		var id = req.params.expId;

		req.app.db.models.Expenses.findById({_id : mongoose.Types.ObjectId(id)},
			function(err , info){
				if(err)
				{
					return next(err);
				}
	    req.app.db.models.User.update({_id: req.payload._id} , 
			{$addToSet: {expenses :req.params.expId}},
			function(err , info){
				if(err)
				{
					console.log('Could not push');
				}
			});	
				res.status(200).json(info)
			});

	},
	update : function(req , res , next)
	{
		var id = req.params.expId;

	var fieldsToSet = {

		amount : req.body.amount,
		date     : req.body.date,
		expType    : req.body.expType
		};

	var options = { new : true };

   req.app.db.models.Expenses.findByIdAndUpdate(id , fieldsToSet , 
   	         options , function(err , docs){
             if(err)
    	{
    		return next(err);
    	}
			
			res.status(200).json(docs);
		});

	},
	remove : function(req , res , next)
	{
		req.app.db.models.Expenses.findByIdAndRemove(req.params.expId, 
   	  function(err , docs){ 

   	  	if(err)
   	  	{
   	  		return next(err);
   	  	}
   	  	req.app.db.models.User.update({_id: req.payload._id} , 
			{$pull: {expenses :req.params.expId}},
			function(err , docs){
				if(err)
				{
					console.log('Could not push');
				}
			});	
   	  	res.status(200).json(docs);
   	  	});

	}
};
module.exports = expense;