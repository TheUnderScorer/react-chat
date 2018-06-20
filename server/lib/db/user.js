const connection     = require( './connection' ),
	  mongoose       = require( 'mongoose' ),
	  bcrypt         = require( 'bcrypt' ),
	  EmailValidator = require( 'email-validator' ),
	  Validator      = require( '../helpers/Validator' ),
	  JsonResponse   = require( '../helpers/JsonResponse' ),
	  Utility = require('../helpers/Utility'),
	  isset = Utility.isset,
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

schema.statics.authenticate = async function( emailOrLogin, password, callback ) {

	const data = EmailValidator.validate( emailOrLogin ) ? { email: emailOrLogin } : { login: emailOrLogin };

	model.findOne( data, ( err, user ) => {
		if ( err ) {
			throw err;
		} else if ( !user ) {
			throw 'Invalid e-mail or password';
		}

		bcrypt.compare( password, user.password, function( err, result ) {
			if ( result ) {
				return user;
			}
			throw 'Invalid e-mail or password';
		} );
	} );

};

module.exports = {
	model:      model,
	schema:     schema,
	/**
	 * Checks if user is logged in
	 *
	 * @return {Boolean}
	 * */
	isLoggedIn: req => isset(req.session) && isset(req.session.userId),

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
	 * @return {Promise|JsonResponse}
	 *
	 * */
	async register( data = {} ) {

		//User is not verified on the start
		data.verified = false;

		//Register as user by default
		data.role = 'user';

		const json = new JsonResponse();

		const messages = [],
			  result   = false;

		const validation = Validator.validate( [ 'login', 'password', 'email' ], data );

		if ( !validation.result ) {
			messages = validation.messages;
			throw messages;
		}

		if ( !EmailValidator.validate( data.email ) ) {
			messages.push( {
				message: 'Invalid email format',
				type:    error
			} );
		}

		if ( /[^a-zA-Z0-9\-_]/.test( data.login ) ) {
			messages.push( {
				message: 'Invalid email format',
				type:    error
			} );
		}

		if ( json.error ) {
			throw messages;
		}

		try {
			const user   = new model( data ),
				  result = await user.save();

			return messages;
		} catch ( e ) {

			throw e.message;
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

		try {
			return await schema.statics.authenticate( emailOrLogin, password );
		} catch ( e ) {
			return e;
		}
	}

};
