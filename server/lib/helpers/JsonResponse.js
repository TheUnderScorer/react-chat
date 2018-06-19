class JsonResponse {

	constructor() {

		/** @property {String} Redirect url */
		this.redirectUrl = '';

		/** @property {Boolean} Result of something */
		this.result = false;

		/** @property {Object} Additional data */
		this.data = {};

		/** @property {Array} Response messages */
		this.messages = [];

		/** @property {boolean} */
		this.error = false;

	}

	/**
	 * Add new message to response
	 *
	 * @param {String} message Message to add
	 * @param {String} type Message type
	 *
	 * */
	addMessage( message, type = 'message' ) {

		if ( type === 'error' ) {
			this.error = true;
		}

		this.messages.push( {
			'message': message,
			'type':    type
		} );

	}

	/**
	 * Get ajax response json
	 *
	 * @return {Object}
	 * */
	get() {

		return {
			'redirectUrl': this.redirectUrl,
			'result':      this.result,
			'data':        this.data,
			'error':       this.error,
			'messages':    this.messages
		};

	}

}

module.exports = JsonResponse;