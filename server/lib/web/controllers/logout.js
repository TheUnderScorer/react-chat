/**
 * Handles logout endpoint
 *
 * @file logout.js
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  Validator    = require( '../../helpers/Validator' );

module.exports = ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

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
};