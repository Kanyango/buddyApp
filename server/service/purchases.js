'use strict';

var mongoose = require('mongoose');

var purchase = {

	create : function(req , res , next){


		var fieldsToSet = {

			date     : req.body.date,
			supplier : req.body.supplier,
			qtty     : req.body.qtty,
			product  : req.body.item,
			amount   : req.body.amount,
			total    : req.body.total,
			user     : req.payload._id
		};
		req.app.db.models.Purchase.create(fieldsToSet, function(err , info){
  			
  			if(err)
  			{	
  				return next(err);
  		    }

  		    req.app.db.models.Product.update({name: req.body.item},
    			{$inc: {qtty: (req.body.qtty)}},
    			function(err , docs){
    				if(err)
    				{
    					return next(err);
    				}
    			});
			
			res.status(200).json(info);
		});
	},

	read : function(req , res , next){
		//var id = req.payload._id;

      req.app.db.models.Purchase.find({user : req.payload._id} ,
      function(err , info){

				if(err)
            	{
            		return next(err);
            	}
			res.status(200).json(info)
		});
	},

	view : function(req , res ,next){

		var id = req.params.purchId;

req.app.db.models.Purchase.findById({_id: mongoose.Types.ObjectId(id)},
          function(err , docs){

    	if(err)
    	{
    		return next(err);
    	}
    	req.app.db.models.User.update({_id: req.payload._id} , 
			{$addToSet: {purchases :req.params.purchId}},
			function(err , docs){
				if(err)
				{
					console.log('Could not push');
				}
			});	
			res.status(200).json(docs);
		}); 
	},

	update : function(req , res , next){

		var id = req.params.purchId;

	var fieldsToSet = {

		supplier : req.body.supplier,
		date     : req.body.date,
		qtty     : req.body.qtty,
		amount     : req.body.amount,
		item    : req.body.product,
		total    : req.body.total

		};

	var options = { new : true };

   req.app.db.models.Purchase.findByIdAndUpdate(id , fieldsToSet , 
   	         options , function(err , docs){
       if(err)
    	{
    		return next(err);
    	}			
			res.status(200).json(docs);
		}); 


	},

	remove : function(req , res ,next){

   req.app.db.models.Purchase.findByIdAndRemove(req.params.purchId, 
   	  function(err , docs){

   	  		if(err)
   	  		{
   	  			return next(err);
   	  		}
   	  		req.app.db.models.User.update({_id: req.payload._id} , 
			{$pull: {purchases :req.params.purchId}},
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
module.exports = purchase;