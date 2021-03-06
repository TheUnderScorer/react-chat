/**
 * Handles get-logged-user endpoint
 *
 * @file is-logged-in.js
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  User         = require( '../../db/models/User' ),
	  Validator    = require( '../../helpers/Validator' );

module.exports = async ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

	if ( !req.session.userId ) {
		Json.addMessage( 'You are not logged in.', 'error' );
		return res.json( Json );
	}

	try {
		Json.result = await User.getUser( req.session.userId );
	} catch ( e ) {
		Json.addMessage( 'Error while fetching user', 'error' );
	}

	return res.json( Json );

};