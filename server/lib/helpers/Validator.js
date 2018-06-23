const Utility = require( './Utility' );

/**
 * Helper class for validating stuff
 * */
class Validator {

	/**
	 * Perform form data validation
	 *
	 * @param {Array} requiredFields Array with names of required fields
	 * @param {Object} data POST/GET form data
	 *
	 * @return {Object} Validation result
	 *
	 * */
	static fields( requiredFields = [], data = {} ) {

		let messages = [],
			result   = true;

		for ( let field of requiredFields ) {
			if ( typeof data[ field ] === 'undefined' || data[ field ] === '' ) {
				let name    = field.replace( new RegExp( '_', 'g' ), ' ' ),
					message = `${name} is required`;

				message = Utility.capitalize( message );

				messages.push( {
					message: message,
					type:    'error',
					target:  field
				} );
				result = false;
			}
		}

		return {
			'messages': messages,
			'result':   result
		};

	}

	/**
	 * Perform token validation
	 *
	 * @param {String} token Provided token
	 * @param {String} sessionToken
	 *
	 * @return {Object} Validation result
	 *
	 * */
	static token( token, sessionToken ) {

		let result = false,
			message;

		if ( !token ) {
			message = 'No token provided';
		}

		if ( token !== sessionToken ) {
			message = 'Token mismatch';
		}

		//No errors
		if ( !message ) {
			result = true;
		}

		return { result, message }

	}


}

module.exports = Validator;