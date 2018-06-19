/**
 * Helper class for managing api connections
 * */
class Api {

	static fetch( url, opts = {} ) {

		//Remove trailing slash
		url = url.replace( '/', '' );

		return fetch( `${Api.endpoint}/${url}`, opts ).then(data => data.json());
	}

	/**
	 * Check if user is logged in
	 *
	 * @return {Promise}
	 * */
	static isLoggedIn() {

		return Api.fetch( '/is_logged_in' );

	}

}

/** @property {String} */
Api.endpoint = '/api/';

export default Api;
