/**
 * Contains all server routes
 *
 * @file routes.js
 *
 * */

const App          = require( '../app' ),
	  User         = require( '../db/user' ),
	  JsonResponse = require( '../helpers/jsonResponse' ),
	  Validator    = require( '../helpers/Validator' ),
	  Crypto       = require( 'crypto' );

App.get( '/api/get-token', async ( req, res ) => {

	const Json = new JsonResponse();

	if ( !req.session.token ) {
		let token = Crypto.randomBytes( 48 ).toString( 'hex' );
		req.session.token = token;
		Json.result = token
	} else {
		Json.result = req.session.token;
	}

	return res.json( Json );

} );

//Handle login
App.post( '/api/login', async ( req, res ) => {

	const Json = new JsonResponse();

	if ( !req.body.email_or_login ) {
		Json.addMessage( 'Login or email are required.', 'error' );
	}

	if ( !req.body.password ) {
		Json.addMessage( 'Password is required.', 'error' )
	}

	if ( Json.error ) {
		return res.json( Json );
	}

	try {
		let user = await User.authenticate( req.body.email_or_login, req.body.password );

		//Let's store user id in session
		req.session.userId = user._id;

		Json.result = true;

		Json.addMessage( 'Logged in!', 'success' );

	} catch ( e ) {
		Json.addMessage( e, 'error' );
	}

	return res.json( Json );

} );

//Handle logout
App.get( '/api/logout', ( req, res ) => {

	const Json = new JsonResponse();

	if ( req.session ) {
		//Destroy session
		return req.session.destroy( ( err ) => {
			if ( err ) {
				Json.addMessage( err, 'error' );
			} else {
				Json.addMessage( 'Logged out', 'success' );
				Json.result = true;
			}
			return res.json( Json );
		} );
	}
} );

//Handle register
App.post( '/api/register', async ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

	if ( User.isLoggedIn( req ) ) {
		Json.addMessage( 'You are already logged in', 'error' );
		return res.json( Json );
	}


	try {
		Json.messages = await User.register( req.body );
		Json.result = true;
	} catch ( e ) {
		Json.messages = e;
	}

	return res.json( Json );

} );

//Check if user is logged
App.get( '/api/is-logged-in', ( req, res ) => {

	const Json = new JsonResponse();

	Json.result = User.isLoggedIn( req );

	return res.json( Json );

} );