const Express    = require( 'express' ),
	  App        = Express(), //Our app ;)
	  Session    = require( 'express-session' ),
	  Path       = require( 'path' ),
	  MongoStore = require( 'connect-mongo' )( Session ), //Mongo session
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
App.use( Express.static( './uploads' ) );

module.exports = App;