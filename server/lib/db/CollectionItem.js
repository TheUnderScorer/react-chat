const Connection = require( './connection' ),
	  Mongoose   = require( 'mongoose' );


/**
 * Helper class for creating new Mongo collections
 * */
class CollectionItem {

	constructor() {

		/**
		 * Stores collection schema
		 *
		 * @name Collection#schema
		 * @property {Schema}
		 *
		 * */
		this.schema = {};

		/**
		 * Stores collection model
		 *
		 * @name Collection#model
		 * @property {Model}
		 *
		 * */
		this.model = {};

		/**
		 * Stores collection name
		 *
		 * @name Collection#name
		 * @property {String}
		 *
		 * */
		this.name = '';

	}

	/**
	 * Create new mongo collection
	 *
	 * @return void
	 * */
	create() {

		this.schema = new Mongoose.Schema( this.schema );
		this.model = Connection.model( this.name, this.schema );

	}

}

module.exports = CollectionItem;