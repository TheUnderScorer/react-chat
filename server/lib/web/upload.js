const Multer = require( 'multer' ), //Middleware for form based requests
	  Path   = require( 'path' ),
	  Fs     = require( 'fs' ),
	  Upload = Multer(
		  {
			  storage: Multer.diskStorage( {
				  destination( req, file, cb ) {
					  if ( req.session && req.session.userId ) {

						  let userId = req.session.userId,
							  path   = `./uploads/${req.session.userId}`;

						  if ( !Fs.existsSync( path ) ) {
							  Fs.mkdirSync( path );
						  }

						  cb( null, `./uploads/${req.session.userId}` )
					  }
				  },
				  filename( req, file, cb ) {
					  let ext = Path.extname( file.originalname );

					  let name;

					  //Avatar upload
					  if ( file.fieldname === 'avatar' ) {
						  name = `avatar`
					  } else {
						  //Chat upload
						  name = `${file.fieldname}${Date.now()}`;
					  }

					  cb( null, name + ext )
				  }
			  } )
		  }
	  );

module.exports = Upload;