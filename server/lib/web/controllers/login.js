/**
 * Handles login endpoint
 *
 * @file login.js
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  User         = require( '../../db/user' ),
	  Validator    = require( '../../helpers/Validator' );

module.exports = async ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

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

};