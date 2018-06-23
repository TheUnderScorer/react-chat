/**
 * Handles register endpoint
 *
 * @file register.js
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  Validator    = require( '../../helpers/Validator' );

module.exports = async ( req, res ) => {

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

};