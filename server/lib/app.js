const Express    = require( 'express' ),
	  App        = Express(),
	  Session    = require( 'express-session' ),
	  MongoStore = require( 'connect-mongo' )( Session ),
	  BodyParser = require( 'body-parser' ),
	  Connection = require( './db/connection' );

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

module.exports = App;