import React, {Component} from 'react';
import './auth.css';
import {Link} from 'react-router-dom';

class Login extends Component {

	handleSubmit( e ) {
		e.preventDefault();

	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind( this )} action="/login" method="post" id="login_form" className="form page-box">
				<div className="form-section">
					<label htmlFor="email_or_login">E-mail or login</label>
					<input type="text" name="email_or_login" id="email_or_login"/>
				</div>
				<div className="form-section">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password"/>
				</div>
				<div className="form-section submit-section">
					<button type="submit">Login</button>
				</div>
				<div className="links">
					<Link to="/register" >Register now!</Link>
					<a href="/forgot_password">Forgot password?</a>
				</div>
			</form>
		)
	}
}

export default Login;