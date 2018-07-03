/**
 * Creates and manages user table in database
 *
 * @file user.js
 *
 * */

const CollectionItem    = require( '../CollectionItem' ),
	  EmailVerification = require( './EmailVerification' ),
	  EmailValidator    = require( 'email-validator' ),
	  Validator         = require( '../../helpers/Validator' ),
	  Utility           = require( '../../helpers/Utility' ),
	  isset             = Utility.isset,
	  Bcrypt            = require( 'bcrypt' );

class User extends CollectionItem {

	constructor() {

		super();

		this.name = 'user';
		this.schema = {
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
		};

		this.create();

		this.schema.pre( 'save', function( next ) {

			Bcrypt.hash( this.password, 10, ( err, hash ) => {
				if ( err ) {
					return next( err );
				}
				this.password = hash;
				next();
			} );

		} );

		this.schema.pre( 'findOneAndUpdate', function( next ) {

			console.log( this );
			next();

		} );

	}

	async authenticate( emailOrLogin, password ) {

		let data = EmailValidator.validate( emailOrLogin ) ? { email: emailOrLogin } : { login: emailOrLogin },
			user = await this.model.findOne( data );

		if ( user && Bcrypt.compareSync( password, user.password ) ) {
			return user;
		}

		throw 'Invalid credentials';

	};

	/**
	 * Checks if user is logged in
	 *
	 * @return {Boolean}
	 * */
	isLoggedIn( req ) {
		return isset( req.session ) && isset( req.session.userId )
	}

	/**
	 * Get user data by his id
	 *
	 * @param {int} userId
	 * @param {String|Object} fields Fields to retrieve
	 *
	 * @return {Promise}
	 * */
	async getUser( userId, fields = 'login email role verified avatarUrl' ) {
		return await this.model.findById( { _id: userId }, fields );
	}

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
			throw validation.messages;
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

			const user   = new this.model( data ),
				  result = await user.save();

			//EmailVerification.sendValidationEmail( result );

			messages.push( {
				message: 'Successfuly registered. Check your e-mail for validation mail.',
				type:    'success',
			} );

			return messages;
		} catch ( e ) {

			let message;
			//Duplicate record code
			if ( e.code && e.code === 11000 ) {

				let field = e.message.split( 'index:' )[ 1 ];

				field = field.split( ' dup key' )[ 0 ];
				field = field.substring( 0, field.lastIndexOf( '_' ) ).trim();

				message = `Provided ${field} is already taken`;

			} else {
				message = e.message;
			}
			messages.push( {
				message,
				type: 'error'
			} );
			throw messages;
		}

	}

}


module.exports = new User();
