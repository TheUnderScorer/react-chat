/**
 * Helper utility class
 * */
class Utility {

	/**
	 * Builds url query
	 *
	 * @param {string} url
	 * @param {Object} data Query data
	 *
	 * @return {String}
	 * */
	static buildQuery( url, data = {} ) {
		let ret = [];
		for ( let d in data )
			ret.push( encodeURIComponent( d ) + '=' + encodeURIComponent( data[ d ] ) );
		return `${url}?${ret.join( '&' )}`;
	}

}

export default Utility;