'use strict';

var mongoose = require('mongoose');
var config = require('./config');
var jwt = require('express-jwt');
var auth  = jwt({ secret : config.secret , userProperty: 'payload'});
var passport = require('./passport');
var sale = require('./server/service/sales');
var product = require('./server/service/products');
var user = require('./server/service/user');
var purchase = require('./server/service/purchases');
var customer = require('./server/service/customers');
var supplier = require('./server/service/supplier');
var expense = require('./server/service/expenses');
var setting = require('./server/service/settings');
var base = "https://mybuddyapp.heroku.com";

module.exports = function(app , passport)
{

	app.post('/newSale', auth ,  sale.create);
    app.get('/dash', auth , user.readProfile);

    //purchase routes
    app.post('/newPurch' , auth  , purchase.create);
    app.get('/purchases' , auth  , purchase.read);
    app.get('/purchases/:purchId' , auth , purchase.view);
    app.get('/purchases/edit/:purchId' , auth , purchase.view);
    app.put('/purchases/edit/:purchId' ,purchase.update);
    app.delete('/purchases/:purchId' , auth , purchase.remove);
    app.post('/newPurch/popup' , auth , product.create);
    app.get('/newPurch' , auth , product.read);
    app.post('/newPurch' , auth , supplier.create);

    //customer routes
    app.get('/customers', auth , customer.read);
    app.post('/newCustomer' , auth , customer.create);
    app.get('/customers/:custId' , auth , customer.view)
    app.get('/customers/edit/:custId' , customer.view);
    app.put('/customers/edit/:custId'  , customer.update);
    app.delete('/customers/:custId' , auth  , customer.remove);

    //supplier routes
    app.get('/suppliers', auth , supplier.read);
    app.post('/newSupp' , auth , supplier.create);
    app.get('/suppliers/:suppId' , auth , supplier.view)
    app.get('/suppliers/edit/:suppId' , supplier.view);
    app.put('/suppliers/edit/:suppId' , supplier.update);
    app.delete('/suppliers/:suppId' , auth ,  supplier.remove);

    //product routes
    app.get('/products', auth , product.read);
    app.post('/newProduct' , auth , product.create);
    app.get('/products/:prodId' , auth ,  product.view)
    app.get('/products/edit/:prodId' , product.view);
    app.put('/products/edit/:prodId' , product.update);
    app.delete('/products/:prodId' , auth ,  product.remove);

    //sales routes
	app.get('/newSale' , auth , product.read);
	app.get('/sales' , auth , sale.read);
	app.get('/sales/:salesId' , auth ,  sale.view);
    app.get('/sales/edit/:salesId' ,  sale.view);
	app.put('/sales/edit/:salesId' ,  sale.update);
	app.delete('/sales/:salesId' , auth , sale.remove);
	app.post('/newSale/popup' , auth , product.create);

    //expenses routes
    app.get('/expenses', auth , expense.read);
    app.post('/newExpenses' , auth , expense.create);
    app.get('/expenses/:expId' , auth , expense.view);
    app.get('/expenses/edit/:expId' , expense.view);
    app.put('/expenses/edit/:expId' , expense.update);
    app.delete('/expenses/:expId' , auth ,  expense.remove);

	app.post('/session/create' , user.create);
	app.post('/login' , user.login);
    
    //fb routes
    app.post('/auth/facebook/token', passport.authenticate('facebook-token'),
   function (req, res) {
    // do something with req.user 
    res.send(req.user? 200 : 401);
  }
);
    app.get(base+'/oauth/facebook' , passport.authenticate('facebook' , {scope :  [ 'email' ] }));
   app.get('/oauth/facebook/callback' , passport.authenticate('facebook',{
        successRedirect : '/home',
        failureRedirect  : '/'
    }));
    app.get('/auth/twitter' , passport.authenticate('twitter'));
    app.get('/auth/twitter/callback' , passport.authenticate('twitter',{
    	successRedirect : '/home',
    	failureRedirect  : '/'
    }));

    app.get('/logout' , function(req , res){
    	req.logout();
    	res.redirect('/');
    });

    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})
};