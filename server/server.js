const Express        = require( 'express' ),
	  App            = Express(),
	  Session        = require( 'express-session' ),
	  MongoStore     = require( 'connect-mongo' )( Session ),
	  BodyParser     = require( 'body-parser' ),
	  Connection     = require( './lib/db/connection' ),
	  User           = require( './lib/db/user' ),
	  JsonResponse   = require( './lib/helpers/jsonResponse' ),
	  Validator      = require( './lib/helpers/Validator' ),
	  Crypto         = require( 'crypto' ),
	  EmailValidator = require( 'email-validator' ),
	  Port           = 5000;

//Setup session
App.use( Session( {
	secret:            'sup_pro',
	resave:            true,
	saveUninitialized: false,
	store:             new MongoStore( {
		mongooseConnection: Connection
	} )
} ) );

//Setup body parser
App.use( BodyParser.urlencoded( {
	extended: false
} ) );
App.use( BodyParser.json() );


App.get( '/api/get-token', async ( req, res ) => {

	const Json = new JsonResponse();

	if ( !req.session.token ) {
		Crypto.randomBytes( 48, ( err, buffer ) => {
			let token = buffer.toString( 'hex' );

			Json.result = token;
			req.session.token = token;

		} );
	} else {
		Json.result = req.session.token;
	}

	return res.json( Json );

} );

//Handle login
App.post( '/api/login', async ( req, res ) => {

	const Json = new JsonResponse();

	if ( !req.body.email_or_login ) {
		Json.addMessage( 'Login or email are required.', 'error' );
	}

	if ( !req.body.password ) {
		Json.addMessage( 'Password is required.', 'error' )
	}

	if ( Json.error ) {
		return res.json( Json );
	}

	try {
		const user = await User.getUserId( req.body.email_or_login, req.body.password );

		//Let's store user id in session
		req.session.userId = user._id;

		Json.result = true;

		Json.addMessage('Logged in!', 'success');

	} catch ( e ) {

		Json.addMessage( e, 'error' );
	}

	return res.json( Json );

} );

//Handle register
App.post( '/api/register', async ( req, res ) => {

	const Json = new JsonResponse();

	let tokenValidation = Validator.token( req.query.token, req.session.token );

	if ( !tokenValidation.result ) {
		Json.addMessage( tokenValidation.message, 'error' );
		return res.json( Json );
	}

	if ( User.isLoggedIn( req ) ) {
		Json.addMessage( 'You are already logged in', 'error' );
		return res.json( Json );
	}


	try {
		Json.messages = await User.register( req.body );
		Json.result = true;
	} catch ( e ) {
		Json.messages = e;
	}

	return res.json( Json );

} );

//Check if user is logged
App.get( '/api/is-logged-in', ( req, res ) => {

	const Json = new JsonResponse();

	Json.result = User.isLoggedIn( req );

	return res.json( Json );

} );

App.listen( Port );