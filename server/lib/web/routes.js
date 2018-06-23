/**
 * Contains all server routes
 *
 * @file routes.js
 *
 * */

const App = require( '../app' );

//Get api token
App.get( '/api/get-token', require( './controllers/get-token' ) );

//Handle login
App.post( '/api/login', require( './controllers/login' ) );

//Handle logout
App.get( '/api/logout', require( './controllers/logout' ) );

//Handle register
App.post( '/api/register', require( './controllers/register' ) );

//Check if user is logged
App.get( '/api/is-logged-in', require( './controllers/is-logged-in' ) );

//Get logged user object
App.get( '/api/get-logged-user', require( './controllers/get-logged-user' ) );