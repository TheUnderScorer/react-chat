const App  = require( '../app' ),
	  Http = require( 'http' ).Server( App ),
	  Port = 5000;

Http.listen( Port );

module.exports = Http;