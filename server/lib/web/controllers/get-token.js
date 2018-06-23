/**
 * Handles get-token endpoint
 *
 * @file getToken.js
 *
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  Crypto       = require( 'crypto' );

module.exports = async ( req, res ) => {

	const Json = new JsonResponse();

	let host = req.protocol + '://' + req.get( 'host' );

	//Request from unknown host
	if ( !require( '../hosts' ).find( item => item === host ) ) {
		Json.addMessage( 'Unknown host', 'error' );
		return res.json( Json );
	}

	if ( !req.session.token ) {
		let token = Crypto.randomBytes( 48 ).toString( 'hex' );
		req.session.token = token;
		Json.result = token
	} else {
		Json.result = req.session.token;
	}

	return res.json( Json );

};