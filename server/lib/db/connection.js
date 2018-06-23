/**
 * @file lib/db/connection.js
 *
 * Manages database connection
 *
 * */

const Mongoose = require( 'mongoose' ),
	  Settings = require( '../settings' );

Mongoose.connect( Settings.db.host, ( err ) => {
	if ( err ) {
		process.exit();
	}
} );

module.exports = Mongoose.connection;