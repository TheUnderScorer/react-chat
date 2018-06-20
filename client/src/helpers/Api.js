/**
 * Helper class for managing api connections
 * */
class Api {

	/** @property {String} API endpoint */
	static endpoint = '/api';

	static post( url, opts ) {

		opts.method = 'POST';

		//Remove trailing slash
		url = url.replace( '/', '' );

		return fetch( `http://localhost:5000${Api.endpoint}/${url}`, opts ).then( data => data.json() );

	}

	static get( url, opts = {} ) {

		//Remove trailing slash
		url = url.replace( '/', '' );

		return fetch( `${Api.endpoint}/${url}`, opts ).then( data => data.json() );
	}

	/**
	 * Check if user is logged in
	 *
	 * @return {Promise}
	 * */
	static isLoggedIn() {

		return Api.get( '/is_logged_in' );

	}

}


export default Api;
