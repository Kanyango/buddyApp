'use strict';

var mongoose = require('mongoose');

var Supplier = {

	create : function(req , res , next)
	{
		var fieldsToSet = {

			name  : req.body.name,
			phone : req.body.phone,
			email : req.body.email,
			address : req.body.address,
			product : req.body.product,
			user : req.payload._id
		};
		
		req.app.db.models.Supplier.create(fieldsToSet, function(err, cust){

			if(err)
			{
				return next(err);
			}
			res.status(200).json(cust)
		});
	},
	read : function(req , res , next)
	{
		req.app.db.models.Supplier.find({user : req.payload._id}, 
			function(err , cust){
					if(err)
			{
				return next(err);
			}
			res.status(200).json(cust)

			});
		
	},
	view : function(req , res , next)
	{
		var id = req.params.suppId;
		req.app.db.models.Supplier.findById({_id: mongoose.Types.ObjectId(id)}, 
			function(err , cust){
					if(err)
			{
				return next(err);
			}
			req.app.db.models.User.update({_id: req.payload._id} , 
			{$addToSet: {suppliers :req.params.suppId}},
			function(err , docs){
				if(err)
				{
					console.log('Could not push');
				}
			});	
			res.status(200).json(cust)

			});
		
		
	},
	update : function(req , res , next)
	{

	var id = req.params.suppId;

	var fieldsToSet = {

		phone : req.body.phone,
		email : req.body.email,
		name  : req.body.name,
		address : req.body.address,
		product : req.body.product
		};

	var options = { new : true };

   req.app.db.models.Supplier.findByIdAndUpdate(id , fieldsToSet , 
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
	req.app.db.models.Supplier.findByIdAndRemove(req.params.suppId, 
   	  function(err , docs){
   	  	if(err)
   	  	{
   	  		return next(err);
   	  	}
   	  	req.app.db.models.User.update({_id: req.payload._id} , 
			{$pull: {suppliers :req.params.suppId}},
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
module.exports = Supplier;