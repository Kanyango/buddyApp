'use strict';

var mongoose = require('mongoose');


var sale = {

	create : function(req , res , next)
	{
		var fieldsToSet = {

			date : req.body.date,
			customer : req.body.customer,
			qtty : req.body.qtty,
			item : req.body.item,
			amount : req.body.amount,
			total : req.body.total,
			user : req.payload._id
		};

		req.app.db.models.Sales.create(fieldsToSet , function(err , data){
			if(err)
			{
				return next(err);
			}
		req.app.db.models.Product.update({name: req.body.item},
			{$inc: {qtty: -(req.body.qtty)}},
			function(err , info){

				if(err)
			{
				return next(err);
			}

			});
		res.status(200).json(data)
		});
	},

	read : function(req , res , next){

           req.app.db.models.Sales.find({user : req.payload._id},null,
 			function(err , docs){

           	if(err)
           	{
           		return next(err);
           	}
           	
           	res.status(200).json(docs);

           });
	},
	view : function(req , res , next){

		var id = req.params.salesId;

     req.app.db.models.Sales.findById({_id : mongoose.Types.ObjectId(id)} ,
          function(err , docs){

    	if(err)
    	{
    		return next(err);
    	}
		req.app.db.models.User.update({_id: req.payload._id} , 
			{$addToSet: {sales :req.params.salesId}},
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
	var id = req.params.salesId;

	var fieldsToSet = {

		customer : req.body.customer,
		item     : req.body.item,
		date     : req.body.date,
		qtty     : req.body.qtty,
		amount   : req.body.amount,
		total    : req.body.total
		};

	var options = { new : true };

   req.app.db.models.Sales.findByIdAndUpdate({_id : mongoose.Types.ObjectId(id)}
   	, fieldsToSet , 
   	         options , function(err , docs){
             if(err)
    	{
    		return next(err);
    	}
			
			res.status(200).json(docs);
		}); 
	},
	remove : function(req , res , next){

		req.app.db.models.Sales.findByIdAndRemove(req.params.salesId , 
			function(err , docs){

				if(err)
				{
					return next(err);
				}
		req.app.db.models.User.update({_id: req.payload._id} , 
			{$pull: {sales :req.params.salesId}},
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
module.exports = sale;












