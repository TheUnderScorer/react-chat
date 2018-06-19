const connection = require( './connection' ),
	  mongoose   = require( 'mongoose' ),
	  schema     = new mongoose.Schema( {
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
	  model      = connection.model( 'user', schema );

module.exports = {
	model:  model,
	schema: schema
};
