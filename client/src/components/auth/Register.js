import React, {Component} from 'react';
import './auth.css';
import {Link} from 'react-router-dom';
import Api from '../../helpers/Api';
import Input from "../form/Input";
import Submit from "../form/Submit";
import FormSection from "../form/FormSection";
import Messages from "../form/Messages";
import Loader from '../loader/Loader';

class Register extends Component {

	constructor() {

		super();

		this.state = {
			isLoading:     false,
			messages:      [],
			result:        false,
		}

	}

	handleSubmit( e ) {

		e.preventDefault();

		this.setState( { isLoading: true } );

		const Fd = new FormData( e.target );

		Api.post( '/register', Fd ).then( data => {

			console.log( data );

			this.setState( {
				isLoading:     false,
				messages:      data.messages,
				result:        data.result
			} );

		} )


	}

	render() {
		let state = this.state;
		return (
			<form onSubmit={this.handleSubmit.bind( this )} action="#" method="post" id="register_form" className="form">

				{state.isLoading && <Loader/>}

				{/* If there are any errors, map them so that we get an array with only text, no objects */}
				<Messages messages={state.messages}/>
				<FormSection>
					<Input name="login" id="login" label="Login"/>
				</FormSection>
				<FormSection>
					<Input name="email" id="email" label="Email"/>
				</FormSection>
				<FormSection>
					<Input name="password" id="password" label="Password" type="password"/>
				</FormSection>
				<FormSection className="submit-section">
					<Submit>
						Register
					</Submit>
				</FormSection>
			</form>
		)
	}
}

export default Register;