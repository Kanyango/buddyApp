'use strict';

module.exports = function(app , mongoose)
{
	require('./server/schema/sales')(app , mongoose);
	require('./server/schema/product')(app , mongoose);
	require('./server/schema/user')(app , mongoose);
	require('./server/schema/purchases')(app , mongoose);
	require('./server/schema/customer')(app , mongoose);
	require('./server/schema/suppliers')(app , mongoose);
	require('./server/schema/expenses')(app , mongoose);
	require('./server/schema/settings')(app , mongoose);
};