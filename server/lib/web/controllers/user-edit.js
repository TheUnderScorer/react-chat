/**
 * Handles user/edit endpoint
 *
 * @file user-edit.js
 *
 * */

const JsonResponse = require( '../../helpers/jsonResponse' ),
	  User         = require( '../../db/user' ),
	  Bcrypt       = require( 'bcrypt' ),
	  Validator    = require( '../../helpers/Validator' );

module.exports = async ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

	if ( !User.isLoggedIn( req ) ) {
		Json.addMessage( 'Validation error.', 'error' );
		return res.json( Json );
	}

	try {
		let newData = {};


		//Let's change user password
		if ( req.body.password !== '' ) {
			newData.password = Bcrypt.hashSync( req.body.password, 10 );
		}

		//TODO Delete user avatar
		if ( !!req.files.avatar && !!req.body.hasAvatar ) {

		}

		await User.model.updateOne( { _id: req.session.userId }, newData );

		Json.addMessage( 'Changes have been saved!', 'success' )


	} catch ( e ) {
		Json.addMessage( 'Error while saving profile.', 'error' );
	}

	return res.json( Json );

};