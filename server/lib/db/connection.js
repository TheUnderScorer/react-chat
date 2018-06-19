/**
 * @file lib/db/connection.js
 *
 * Manages database connection
 *
 * */

const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://127.0.0.1:27017/' );

module.exports = mongoose.connection;