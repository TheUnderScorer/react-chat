/**
 * Helper class for validatin stuff
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
	static validate( requiredFields = [], data = {} ) {

		let messages = [],
			result   = true;

		for ( let requiredfield of requiredFields ) {
			if ( typeof data[ requiredfield ] === 'undefined' || data[ requiredfield ] === '' ) {
				let name    = requiredfield.capitalize().replace( new RegExp( '_', 'g' ), ' ' ),
					message = `${name} is required`;
				messages.push( {
					message: message,
					type:    'error'
				} );
				result = false;
			}
		}

		return {
			'messages': messages,
			'result':   result
		};

	}

}

module.exports = Validator;