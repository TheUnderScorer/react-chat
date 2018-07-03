const Multer = require( 'multer' ), //Middleware for form based requests
	  Path   = require( 'path' ),
	  Fs     = require( 'fs' ),
	  Upload = Multer(
		  {
			  storage: Multer.diskStorage( {
				  destination( req, file, cb ) {
					  if ( req.session && req.session.userId ) {

						  let userId = req.session.userId,
							  path   = `./uploads/${userId}`;

						  if ( !Fs.existsSync( path ) ) {
							  Fs.mkdirSync( path );
						  }

						  cb( null, `./uploads/${userId}` )
					  }
				  },
				  filename( req, file, cb ) {
					  let ext  = Path.extname( file.originalname ),
						  name = file.fieldname;

					  if ( name !== 'avatar' ) {
						  //Chat upload
						  name = `${file.fieldname}${Date.now()}`;
					  }

					  cb( null, name + ext )
				  }
			  } )
		  }
	  );

module.exports = Upload;