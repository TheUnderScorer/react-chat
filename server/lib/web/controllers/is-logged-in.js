/**
 * Handles is-logged-in endpoint
 *
 * @file is-logged-in.js
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  User         = require( '../../db/user' ),
	  Validator    = require( '../../helpers/Validator' );

module.exports = ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

	Json.result = User.isLoggedIn( req );

	return res.json( Json );

};