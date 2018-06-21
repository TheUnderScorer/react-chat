/**
 * Helper utility class
 * */
class Utility {

	/**
	 * Check if value exists
	 *
	 * @param value
	 *
	 * @return {Boolean}
	 * */
	static isset( value ) {
		return typeof value !== 'undefined';
	}

	/**
	 * Capitalize first letter of a string
	 *
	 * @param {String} string
	 *
	 * @return {String}
	 *
	 * */
	static capitalize( string ) {
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	}

}

module.exports = Utility;