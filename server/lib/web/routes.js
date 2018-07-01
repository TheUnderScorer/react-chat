/**
 * Contains all server routes
 *
 * @file routes.js
 *
 * */

const App    = require( '../app' ),
	  Upload = require( './upload' );

//Get api token
App.get( '/api/get-token', require( './controllers/get-token' ) );

//Handle login
App.post( '/api/login', Upload.array(), require( './controllers/login' ) );

//Handle logout
App.get( '/api/logout', require( './controllers/logout' ) );

//Handle register
App.post( '/api/register', Upload.array(), require( './controllers/register' ) );

//Check if user is logged
App.get( '/api/is-logged-in', require( './controllers/is-logged-in' ) );

//Get logged user object
App.get( '/api/get-logged-user', require( './controllers/get-logged-user' ) );

//Handle creating new chat
App.post( '/api/create-chat', require( './controllers/create-chat' ) );

//Get user chats
App.get( '/api/get-chats', require( './controllers/get-chats' ) );

//Handle modifing user profile
App.post( '/api/user/edit', Upload.fields( [ { name: 'avatar' } ] ), require( './controllers/user-edit' ) );