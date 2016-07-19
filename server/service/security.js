'use strict';

var security = {

	var socialLogin  =  function(provider , req , res ,next)
	{
		provider = provider.toLowerCase();

		
	}

	signup : function(req , res)
	{
		req.app.db.models.User.encryptPassword(req.body.password , function(err , hash){

		if(err)
		{
			return res.json({success: false , message: password error buddy});
		}


		var fieldsToSet = {
           username : req.body.username ,
           password : hash ,
           phone    : req.body.phone,
		};
		req.app.db.models.User.create(fieldsToSet , function(err , user){
			if(err)
			{
				return res.json({success: false , message: Error Buddy});
			}
			res.json({success: true, message: 'Successfully Entered'});
		});
    });
		
	},
	loginFacebook : function(req , res , next)
	{
		return socialLogin('facebook ', req , res ,next)
	}
};