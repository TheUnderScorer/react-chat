import React, {Component} from 'react';
import './auth.css';
import {Link} from 'react-router-dom';
import Api from '../../helpers/Api';

class Register extends Component {

	constructor() {

		super();

		this.state = {
			isSubmit: false,
		}

	}

	handleSubmit( e ) {

		e.preventDefault();

		const Fd = new FormData( e.target );

		this.state.isSubmit = true;

		Api.post( '/register', {
			body:        Fd,
			headers:     { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' },
			mode:        'cors',
			credentials: 'include'
		} ).then( data => {

			this.state.isSubmit = false;
			console.log( data );

		} )


	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind( this )} action="#" method="post" id="register_form" className="form">
				<div className="form-section">
					<label htmlFor="login">Login</label>
					<input type="text" name="login" id="login"/>
				</div>
				<div className="form-section">
					<label htmlFor="email">E-mail</label>
					<input type="text" name="email" id="email"/>
				</div>
				<div className="form-section">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password"/>
				</div>
				<div className="form-section submit-section">
					<button type="submit">Register</button>
				</div>
			</form>
		)
	}
}

export default Register;