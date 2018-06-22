const Socket = require( 'socket.io' ),
	  Http   = require( './http' ),
	  Io     = Socket.listen( Http );

Io.sockets.on( 'connection', ( socket ) => {

	//Handle joining to chat room
	socket.on( 'join', ( login, room ) => {

		socket.join( room );

	} );


} );


