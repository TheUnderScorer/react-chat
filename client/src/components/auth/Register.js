import React, {Component} from 'react';
import './auth.css';
import {Link} from 'react-router-dom';

class Register extends Component {

	handleSubmit( e ) {
		e.preventDefault();

	}

	render() {
		return (
			<section className="page-box">
				<a href="/" className="return">
					<i className="material-icons">arrow_back</i>
				</a>
				<form action="/register" method="post" id="register_form" className="form">
					<div className="form-section">
						<label htmlFor="login">Login</label>
						<input type="text" name="login" id="login" />
					</div>
					<div className="form-section">
						<label htmlFor="email">E-mail</label>
						<input type="text" name="email" id="email" />
					</div>
					<div className="form-section">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" />
					</div>
					<div className="form-section submit-section">
						<button type="submit">Register</button>
					</div>
				</form>
			</section>
		)
	}
}

export default Register;