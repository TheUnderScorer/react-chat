import ApiResponse from './ApiResponse';

/**
 * Helper class for managing api connections
 * */
class Api {

	/** @property {String} API endpoint */
	static endpoint = 'api';

	static token = '';

	/**
	 * Generate new access token if it's not stored in localStorage
	 *
	 * @return void
	 * */
	static getToken() {

		Api.get( '/get-token' ).then( data => {
			Api.token = data.result
		} ).catch( e => console.log( e ) );

	}

	static clearToken() {
		Api.token = '';
	}

	/**
	 * Perform post request to api
	 *
	 * @param {String} url
	 * @param {FormData|Object} data
	 *
	 * @return {Promise}
	 * */
	static async post( url, data ) {

		if ( data instanceof FormData ) {
			data = Api.formDataToJson( data );
		}

		let headers = new Headers( {
				'Access-Control-Allow-Origin': '*',
				'content-type':                'application/json'
			} ),
			opts    = {
				body:        JSON.stringify( data ),
				method:      'POST',
				headers:     headers,
				credentials: 'include'
			};

		let token  = Api.token,
			result = await fetch( `/${Api.endpoint}${url}?token=${token}`, opts ),
			json   = await result.json();

		return new ApiResponse( json );

	}

	/**
	 * Perform get request to api
	 *
	 * @return {Promise}
	 * */
	static async get( url, opts = {} ) {

		opts.credentials = 'include';

		let result = await fetch( `/${Api.endpoint}${url}`, opts ),
			json   = await result.json();


		return new ApiResponse( json );

	}

	/**
	 * Check if user is logged in
	 *
	 * @return {Promise}
	 * */
	static isLoggedIn() {

		return Api.get( '/is-logged-in' );

	}

	/**
	 * Convert form data to json format
	 *
	 * @param {FormData} data
	 *
	 * @return {Object}
	 * */
	static formDataToJson( data ) {

		let result = {};

		for ( let item of  data.entries() ) {
			let [ key, value ] = item;
			result[ key ] = value;
		}

		return result;

	}

}


export default Api;
