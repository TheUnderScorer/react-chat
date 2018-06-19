const express      = require( 'express' ),
	  app          = express(),
	  session      = require( 'express-session' ),
	  MongoStore   = require( 'connect-mongo' )( session ),
	  bodyParser   = require( 'body-parser' ),
	  connection   = require( './lib/db/connection' ),
	  user         = require( './lib/db/user' ),
	  JsonResponse = require( './lib/helpers/JsonResponse' ),
	  port         = 5000;

//Setup session
app.use( session( {
	secret:            'sup_pro',
	resave:            true,
	saveUninitialized: false,
	store:             new MongoStore( {
		mongooseConnection: connection
	} )
} ) );

//Setup body parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
	extended: true
} ) );

//Handle login
app.post( 'api/login', async ( req, res ) => {

	const json = new JsonResponse();

	if ( !req.body.loginOrEmail ) {
		json.addMessage( 'Login or email are required.', 'error' );
	}

	if ( !req.body.password ) {
		json.addMessage( 'Password is required.', 'error' )
	}

	if ( json.error ) {
		res.json( json );
	}

	try {
		const user = await user.getUserId( req.body.loginOrEmail, req.body.password );

		//Let's store user id in session
		req.session.userId = user._id;

		json.result = true;

	} catch ( e ) {
		json.addMessage( e, 'error' );
	}

	res.json( json );

} );

//Handle register
app.post( 'api/register', async ( req, res ) => {

	const json = new JsonResponse();

	if ( user.isLoggedIn( req ) ) {
		json.addMessage( 'You are already logged in', 'error' );
		res.json( json );
	}

	try {
		json.result = await user.register( req.body );
	} catch ( e ) {
		json.addMessage( e.message, 'error' )
	}

	res.json( json );

} );

//Check if user is logged
app.get( '/api/is_logged_in', ( req, res ) => {

	res.json( user.isLoggedIn( req ) );

} );

app.get( '/api/customers', ( req, res ) => {

	const customers = [
		{
			id:        1,
			firstName: 'John',
			lastName:  'Johnson'
		},
		{
			id:        2,
			firstName: 'Greg',
			lastName:  'Dope'
		},
		{
			id:        3,
			firstName: 'Annie',
			lastName:  'Tobied'
		},
		{
			id:        4,
			firstName: 'Annie',
			lastName:  'Best'
		},
		{
			id:        5,
			firstName: 'Greg',
			lastName:  'Worst'
		},
		{
			id:        6,
			firstName: 'Greg',
			lastName:  'Medium'
		},
	];

	res.json( customers );

} );

app.listen( port );