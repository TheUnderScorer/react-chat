/**
 * Creates and manages email verification table
 *
 * @file user.js
 *
 * */

const Connection = require( './connection' ),
	  Mongoose   = require( 'mongoose' ),
	  Bcrypt     = require( 'bcrypt' ),
	  Mailer     = require( '../web/mailer' ),
	  Schema     = new Mongoose.Schema( {
		  user:    {
			  type: Mongoose.Schema.ObjectId,
			  ref:  'user'
		  },
		  email:   {
			  type:     String,
			  unique:   true,
			  required: true,
			  trim:     true,
		  },
		  token:   {
			  type:     String,
			  unique:   true,
			  required: true,
			  trim:     true
		  },
		  expires: {
			  type:     Date,
			  required: true
		  }

	  } ),
	  Model      = Connection.model( 'email-verification', Schema );

module.exports = {

	/**
	 * Send validate e-mail
	 *
	 * @param {String} _id User ID
	 * @param {String} email
	 *
	 * @return {Promise}
	 * */
	async sendValidationEmail( { _id, email } ) {

		let now    = new Date(),
			today  = (now).valueOf().toString(),
			random = Math.random().toString();

		//Token expires in 48 hours
		now.setDate( now.getDate() + 2 );

		try {

			let token   = Bcrypt.hashSync( today + random, 10 ),
				url     = require( '../settings' ).url,
				message = `<p>To validate your e-mail <a href="${url}?token=${token}">click here.</a></p>`,
				model   = new Model( {
					email:   email,
					token:   token,
					user:    _id,
					expires: now
				} ),
				result  = await model.save(),
				mail    = await Mailer.sendMail( {
					to:      email,
					subject: 'Chat e-mail verification',
					html:    message
				} );
		} catch ( e ) {
			console.error( e );
			return false;
		}

		return true;

	}

};