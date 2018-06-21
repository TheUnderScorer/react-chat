/**
 * Creates and manages user table in database
 *
 * @file user.js
 *
 * */

const connection     = require( './connection' ),
	  mongoose       = require( 'mongoose' ),
	  bcrypt         = require( 'bcrypt' ),
	  EmailValidator = require( 'email-validator' ),
	  Validator      = require( '../helpers/Validator' ),
	  Utility        = require( '../helpers/Utility' ),
	  isset          = Utility.isset,
	  schema         = new mongoose.Schema( {
		  email:     {
			  type:     String,
			  unique:   true,
			  required: true,
			  trim:     true
		  },
		  login:     {
			  type:     String,
			  unique:   true,
			  required: true,
			  trim:     true
		  },
		  password:  {
			  type:     String,
			  required: true,
		  },
		  verified:  {
			  type:     Boolean,
			  required: true,
		  },
		  avatarUrl: {
			  type:     String,
			  unique:   false,
			  required: false,
			  trim:     true
		  },
		  role:      {
			  type:     String,
			  required: true,
			  trim:     true
		  }
	  } ),
	  model          = connection.model( 'user', schema );

//Encrypt user password before saving it
schema.pre( 'save', function( next ) {

	bcrypt.hash( this.password, 10, ( err, hash ) => {
		if ( err ) {
			return next( err );
		}
		this.password = hash;
		next();
	} );

} );

//Validate user password
schema.statics.authenticate = async function( emailOrLogin, password ) {

	const data = EmailValidator.validate( emailOrLogin ) ? { email: emailOrLogin } : { login: emailOrLogin };

	let user    = await model.findOne( data ),
		compare = bcrypt.compareSync( password, user.password );

	if ( user && compare ) {
		return user;
	}

	throw 'Invalid credentials';

};

module.exports = {
	model:      model,
	schema:     schema,
	/**
	 * Checks if user is logged in
	 *
	 * @return {Boolean}
	 * */
	isLoggedIn: req => isset( req.session ) && isset( req.session.userId ),

	/**
	 * Get user data by his id
	 *
	 * @param {int} userId
	 *
	 * @return {Promise}
	 * */
	async getUser( userId ) {
		return await model.findOne( { _id: userId } );
	},

	/**
	 * Handles registering
	 *
	 * @param {Object} data
	 *
	 * @return {Promise}
	 *
	 * */
	async register( data = {} ) {

		//User is not verified on the start
		data.verified = false;

		//Register as user by default
		data.role = 'user';

		let messages   = [],
			validation = Validator.fields( [ 'login', 'password', 'email' ], data );

		if ( !validation.result ) {
			messages = validation.messages;
			throw messages;
		}

		if ( !EmailValidator.validate( data.email ) ) {
			messages.push( {
				message: 'Invalid email format',
				type:    'error',
				target:  'email'
			} );
		}

		if ( /[^a-zA-Z0-9\-_]/.test( data.login ) ) {
			messages.push( {
				message: 'Special characters are not allowed in login',
				type:    'error',
				target:  'email'
			} );
		}

		if ( messages.length ) {
			throw messages;
		}

		try {
			const user   = new model( data ),
				  result = await user.save();

			messages.push( {
				message: 'Successfuly registered',
				type:    'success',
			} );

			return messages;
		} catch ( e ) {
			let message = e.message;
			messages.push( {
				message,
				type: 'error'
			} );
			throw messages;
		}

	},

	/**
	 * Get user by his email|login and password
	 *
	 * @param {String} emailOrLogin
	 * @param {String} password
	 *
	 * @return {Promise}
	 *
	 * */
	async getUserId( emailOrLogin, password ) {

		return await schema.statics.authenticate( emailOrLogin, password );

	}

};
