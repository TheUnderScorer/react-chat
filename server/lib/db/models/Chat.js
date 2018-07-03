/**
 * Creates and manages chat table in database
 *
 * @file chat.js
 *
 * */

const CollectionItem    = require( '../CollectionItem' ),
	  Mongoose          = require( 'mongoose' ),
	  EmailVerification = require( './EmailVerification' ),
	  EmailValidator    = require( 'email-validator' ),
	  Validator         = require( '../../helpers/Validator' ),
	  Utility           = require( '../../helpers/Utility' ),
	  isset             = Utility.isset,
	  Bcrypt            = require( 'bcrypt' );

class Chat extends CollectionItem {

	constructor() {

		super();

		this.name = 'chat';
		this.schema = {
			owner: {
				type: Mongoose.Schema.ObjectId,
				ref:  'user'
			},
			users: {
				type: Array,
			},
			//Unique chat slug
			slug:  {
				type:     String,
				unique:   true,
				required: true,
				trim:     true,
			},
			name:  {
				type:     String,
				required: true,
				trim:     true,
			},
			icon:  {
				type: String,
				trim: true,
			},
		};

		this.create();

	}

	/**
	 * Get chats by user id
	 *
	 * @param {String} owner
	 *
	 * @return {Promise}
	 * */
	async getUserChats( owner ) {

		return await this.model.find( { owner } );

	}

}

module.exports = new Chat();
