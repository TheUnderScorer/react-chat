/**
 * Helper function for creating new api response
 * */
class ApiResponse {

	/**
	 * Api response constructor
	 *
	 * @param {String} redirectUrl
	 * @param {Boolean} result
	 * @param {Object} data
	 * @param {Array|Object} messages
	 * @param {Boolean} error
	 *
	 * */
	constructor( { redirectUrl, result, data, messages, error } ) {

		this.redirectUrl = redirectUrl;
		this.result = result;
		this.data = data;
		this.messages = messages;
		this.error = error;

	}

	/**
	 * Parse messages to object, with target as key
	 *
	 * @return {ApiResponse} Parsed response
	 * */
	parseMessages() {

		let messages = {};

		if ( Array.isArray( this.messages ) && this.messages.length ) {
			this.messages.forEach( item => {

				let message = item.message,
					type    = item.type,
					target  = item.target;

				if ( !Array.isArray( messages[ target ] ) ) {
					messages[ target ] = [];
				}

				messages[ target ].push( { type, message } );

			} );

			this.messages = messages;

		}

		return this;

	}

	getMessage( target ) {

		return this.messages.hasOwnProperty( target ) ? this.messages[ target ] : [];

	}


}

export default ApiResponse;