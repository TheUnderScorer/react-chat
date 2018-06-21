/**
 * Creates node server
 *
 * @file server.js
 *
 * */

//Load routes
require( './lib/web/routes' );

const App  = require( './lib/app' ),
	  Port = 5000;

App.listen( Port );