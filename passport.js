'use strict';

module.exports = function(app , passport)
{
//var FB = require('fb');
//var mongoose  = require('mongoose');
//var User = mongoose.model('User');
//var mongoose = require('mongoose');
//var User = require('./server/schema/user');
//var FacebookTokenStrategy = require('passport-facebook-token');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy    = require('passport-local').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
//var config = require('./config');
//var User = require('./server/schema/user');


    passport.use(new LocalStrategy(
     function(username, password, done) {

        process.nextTick(function(){ 
          app.db.models.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
        });
  }
));

   passport.use(new FacebookStrategy({
      
      //grant_type: 'fb_exchange_token',
      clientID : app.config.oauth.facebook.clientID,
      clientSecret : app.config.oauth.facebook.clientSecret,
      callbackURL : app.config.oauth.facebook.callbackURL,
      //enableProof : true
      profileFields : ['id', 'name', 'email']
     // fb_exchange_token: 'dcbb6647eea93e0f4f2e502edfab3f7b'
      //passReqToCallback : true
    },
    function(accessToken , refreshToken , profile , done)
    {

      process.nextTick(function(){

      app.db.models.User.findOne({'facebook.id' : profile.id},function(err , user){

          if(err) return done(err);

          if(user)
          {
            return done(null , user);
          } else{

            var newUser = new app.db.models.User();

            newUser.facebook.id    = profile.id; // set the users facebook id                   
            newUser.facebook.token = accessToken; // we will save the token that facebook provides to the user                    
            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            newUser.save(function(err){
              if(err) throw err;

              return done(null , newUser);
            });
          }
        });
      });
    }));
    
    passport.use(new TwitterStrategy({
      consumerKey : app.config.oauth.twitter.consumerKey,
      consumerSecret :  app.config.oauth.twitter.consumerSecret,
      callbackURL   :  app.config.oauth.twitter.callbackURL
    },
    function(token , tokenSecret , profile ,done)
    {
      process.nextTick(function(){

        app.db.models.User.findOne({'twitter.id' : profile.id}, function(err , user){
          if(err) return done(err);

          if(user)
          {
            return done(null , user);
          }
          else{

            var newUser = new app.db.models.User();

            newUser.twitter.id = profile.id;
            newUser.twitter.token = token;
            newUser.twitter.username = profile.username;
            newUser.twitter.displayName = profile.displayName;

            newUser.save(function(err){
              if(err) throw err;
              return done(null , newUser);
            });
          }
        });
      });
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};




























