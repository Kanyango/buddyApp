'use strict';

var mongoose = require('mongoose');

var setting = {

	create : function(req , res , next)
	{
		var fieldsToSet = {

			user : req.payload._id,
			name : req.body.name,
			email : req.body.email,
			phone : req.body.phone,
			bizName : req.body.bname,
			industry: req.body.industry,
			location : req.body.location,
			address : req.body.address,
			oContact : req.body.office,
			website : req.body.web
		};
		req.app.db.models.Setting.create(fieldsToSet , function(err , data){
			if(err)
			{
				return next(err);
			}
			res.status(200).json(data);
		});
	},
	read : function(req , res , next)
	{
		req.app.db.models.Setting.find({user : req.payload._id} , function(err , data){
			if(err)
			{
				return next(err);
			}
			res.status(200).json(data);
		});
		
	},
	update : function(req , res )
	{

	var fieldsToSet = {

			user  : req.payload._id,
			name  : req.body.name,
			email : req.body.email,
			phone : req.body.phone,
			bname : req.body.bname,
			industry: req.body.industry,
			location : req.body.location,
			address : req.body.address,
			oContact : req.body.office,
			website : req.body.web
		};

	var options = { new : true };

   req.app.db.models.Setting.findOneAndUpdate({user : req.payload._id} , fieldsToSet , 
   	         options , function(err , docs){
            res.status(200).json(docs);
			console.log(docs);
		});

	}
};
module.exports = setting;