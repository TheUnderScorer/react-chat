const Express      = require( 'express' ),
	  App          = Express(),
	  Session      = require( 'express-session' ),
	  MongoStore   = require( 'connect-mongo' )( Session ),
	  BodyParser   = require( 'body-parser' ),
	  Connection   = require( './lib/db/connection' ),
	  User         = require( './lib/db/user' ),
	  JsonResponse = require( './lib/helpers/JsonResponse' ),
	  Port         = 5000;

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
App.use( BodyParser.json() );
App.use( BodyParser.urlencoded( {
	extended: true
} ) );

//Handle login
App.post( 'api/login', async ( req, res ) => {

	const Json = new JsonResponse();

	if ( !req.body.loginOrEmail ) {
		Json.addMessage( 'Login or email are required.', 'error' );
	}

	if ( !req.body.password ) {
		Json.addMessage( 'Password is required.', 'error' )
	}

	if ( Json.error ) {
		res.json( Json );
	}

	try {
		const user = await User.getUserId( req.body.loginOrEmail, req.body.password );

		//Let's store user id in session
		req.session.userId = user._id;

		Json.result = true;

	} catch ( e ) {
		Json.addMessage( e, 'error' );
	}

	res.json( Json );

} );

//Handle register
App.post( 'api/register', async ( req, res ) => {

	const Json = new JsonResponse();

	if ( User.isLoggedIn( req ) ) {
		Json.addMessage( 'You are already logged in', 'error' );
		res.json( Json );
	}

	try {
		Json.result = await User.register( req.body );
	} catch ( e ) {
		Json.addMessage( e.message, 'error' )
	}

	res.json( Json );

} );

//Check if user is logged
App.get( '/api/is_logged_in', ( req, res ) => {

	const Json = new JsonResponse();

	Json.result = User.isLoggedIn(req);

	res.json( Json );

} );

App.listen( Port );