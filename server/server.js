/**
 * Creates node server
 *
 * @file server.js
 *
 * */

//Load app
require( './lib/app' );

//Load server
require( './lib/web/http' );

//Load routes
require( './lib/web/routes' );

//Load chat socket
require( './lib/web/chat' );

