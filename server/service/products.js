'use strict'

var mongoose = require('mongoose');

var product = {

	create : function(req , res , next)
	{

			var fieldsToSet = {

					name : req.body.name,
					desc : req.body.desc,
					price : req.body.price,
					qtty : req.body.qtty,
					cat : req.body.cat,
					user : req.payload._id
			};

		req.app.db.models.Product.create(fieldsToSet , function(err , info){
			if(err)
			{
				return next(err);
			}
			res.status(200).json(info);
		 });
	},
	read : function(req , res , next)
	{
		req.app.db.models.Product.find({user : req.payload._id}, 
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
		var id = req.params.prodId;

		req.app.db.models.Product.findById(id , function(err , docs){
			if(err)
			{
				return next(err);
			}
			req.app.db.models.User.update({_id: req.payload._id} , 
			{$addToSet: {products :req.params.prodId}},
			function(err , docs){
				if(err)
				{
					console.log('Could not push');
				}
			});	
			res.status(200).json(docs);
		});
	},
	update : function(req , res , next)
	{

	var id = req.params.prodId;

	var fieldsToSet = {

			name : req.body.name,
			desc : req.body.desc,
			price : req.body.price,
			qtty : req.body.qtty,
			cat : req.body.cat
		};

	var options = { new : true };

   req.app.db.models.Product.findByIdAndUpdate(id , fieldsToSet , 
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
	req.app.db.models.Product.findByIdAndRemove(req.params.prodId, 
   	  function(err , docs){

   	  		if(err)
   	  		{
   	  			return next(err)
   	  		}
   	  req.app.db.models.User.update({_id: req.payload._id} , 
			{$pull: {products :req.params.prodId}},
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
module.exports = product;