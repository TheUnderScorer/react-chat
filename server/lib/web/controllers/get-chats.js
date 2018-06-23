/**
 * Handles get-chats endpoint
 *
 * @file get-chats.js
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  User         = require( '../../db/user' ),
	  Chat         = require( '../../db/Chat' ),
	  Validator    = require( '../../helpers/Validator' );

module.exports = async ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

	if ( !User.isLoggedIn( req ) ) {
		Json.addMessage( 'You must be logged in to do that', 'error' );
		return res.json( Json );
	}

	try {
		Json.result = Chat.getUserChats( req.session.userId );
	} catch ( e ) {
		console.error( e );
		Json.addMessage( 'Error while fetching chats', 'error' );
	}

	return res.json( Json );

};