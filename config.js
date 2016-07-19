'use strict';



exports.mongodb = {
	//uri: 'mongodb://127.0.0.1:27017/BuddyAppDB'
	uri: "mongodb://DaveBuddy:bmw760li@ds015915.mlab.com:15915/buddyappdb"
};
exports.secret = 'b7TY?>m6wl_i/<';

exports.oauth = {

	'facebook' :{

		'clientID'    : '1091247900936084',
		'clientSecret': '941a60d3455544c0aa1ffbae17d3d95d',
		'callbackURL' : 'http://localhost:8080/oauth/facebook/callback'
	},

	'twitter' :{
		'consumerKey'    : 't3r87nEjaUpQpyayIzRwKPhOO',
		'consumerSecret' : 'OI5xaXTgkURzEKkIMbONQuYudAJTOq0mve509Vl39lW3iUFwrD',
		'callbackUrl' : 'http://localhost:8080/auth/twitter/callback'
	}
};
