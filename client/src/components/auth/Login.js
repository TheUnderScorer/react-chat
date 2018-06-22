import React, {Component} from 'react';
import './auth.css';
import {Link} from 'react-router-dom';
import Api from '../../helpers/Api';
import Input from "../form/Input";
import Submit from "../form/Submit";
import FormSection from "../form/FormSection";
import Messages from "../form/Messages";
import Loader from '../loader/Loader';
import Form from "../form/Form";

class Login extends Form {

	handleSubmit( e ) {

		e.preventDefault();

		this.setState( { isLoading: true } );

		const Fd = new FormData( e.target );

		Api.post( '/login', Fd ).then( data => {

			console.log( data );
			this.setState( {
				isLoading: false,
				messages:  data.messages,
				result:    data.result
			} );

			if ( data.result ) {
				setTimeout( () => window.location.reload(), 500 );
			}

		} )

	}

	render() {
		let state = this.state;
		return (
			<form onSubmit={this.handleSubmit.bind( this )} action="/login" method="post" id="login_form" className="form page-box">

				{state.isLoading && <Loader/>}

				<Messages messages={state.messages}/>

				<FormSection>
					<Input name="email_or_login" id="email_or_login" label="E-mail or login"/>
				</FormSection>
				<FormSection>
					<Input name="password" id="password" label="Password" type="password"/>
				</FormSection>
				<FormSection className="submit-section">
					<Submit>
						Login
					</Submit>
				</FormSection>
				<div className="links">
					<Link to="/register">Register now</Link>
					<Link to="/forgot-password">Forgot password</Link>
				</div>
			</form>
		)
	}
}

export default Login;