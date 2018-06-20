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

}

module.exports = Utility;