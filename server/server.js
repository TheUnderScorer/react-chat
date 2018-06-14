const express = require( 'express' ),
	  app     = express(),
	  port    = 5000;

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