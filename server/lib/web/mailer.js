const NodeMailer = require( 'nodemailer' ),
	  Mailer     = NodeMailer.createTransport(
		  {
			  pool:   true,
			  host:   'smtp.gmail.com',
			  port:   587,
			  secure: false,
			  tls:    {
				  rejectUnauthorized: false,
			  },
			  auth:   {
				  user: 'przemyslawzydek1@gmail.com',
				  pass: '###'
			  },
		  }
	  );

module.exports = Mailer;
