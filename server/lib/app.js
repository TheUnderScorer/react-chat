const Express    = require( 'express' ),
	  App        = Express(), //Our app ;)
	  Session    = require( 'express-session' ),
	  Path       = require( 'path' ),
	  MongoStore = require( 'connect-mongo' )( Session ), //Mongo session
	  BodyParser = require( 'body-parser' ), //middleware for parsing requests
	  Connection = require( './db/connection' ); //connection with mongo database

//Setup session
App.use( Session( {
	secret:            'sup_pro',
	resave:            true,
	saveUninitialized: false,
	store:             new MongoStore( {
		mongooseConnection: Connection
	} )
} ) );

//Setup public path
App.use( Express.static( Path.join( __dirname, 'public' ) ) );

module.exports = App;