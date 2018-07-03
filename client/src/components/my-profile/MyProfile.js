import React from 'react';
import Form from '../form/Form';
import Api from "../../helpers/Api";
import Loader from "../loader/Loader";
import FormSection from "../form/FormSection";
import Input from "../form/Input";
import Upload from "../form/Upload";
import Submit from "../form/Submit";
import Messages from "../form/Messages";
import Home from '../home/Home';

import './my-profile.css';

class MyProfile extends Form {

	constructor() {

		super();

		this.state.user = {};

	}

	componentDidMount() {

		//We always set this state before performin fetch call to display loader
		this.setState( { isLoading: true } );

		Api.isLoggedIn().then( data => {

			this.setState( {
				isLoading: false,
			} );

			if ( data.result ) {

				this.setState( { isLoading: true } );

				Api.getCurrentUser().then( data => {
					this.setState( {
						user:      data.result,
						isLoading: false,
					} );
				} );

			} else {
				this.setState( {
					user: false,
				} );
			}

		} )

	}

	handleSubmit( e ) {

		e.preventDefault();

		let fd = new FormData( e.target );

		this.setState( { isLoading: true } );

		Api.post( '/user/edit', fd ).then( data => {
			this.setState( {
				messages:  data.messages,
				isLoading: false,
			} );

			Home.updateUser( data.result );
		} );

	}

	render() {

		let state = this.state;

		if ( !state.user ) {
			return <Loader/>
		}

		return (

			<div className="edit-profile">
				<Loader visible={state.isLoading}/>

				<form className="form" id="edit_profile_form" method="POST" action="#" onSubmit={e => this.handleSubmit( e )}>

					<Messages messages={state.messages}/>

					<FormSection>
						<Upload label="Avatar" name="avatar" id="avatar" type="image"/>
					</FormSection>

					<FormSection>
						<Input value={state.user.login} label="Login" id="login" name="login" disabled={true}/>
					</FormSection>

					<FormSection>
						<Input value={state.user.email} label="Email" id="email" name="email" disabled={true}/>
						{!state.user.confirmed &&
						<span className="input-notice">Your account is not confirmed</span>
						}
					</FormSection>

					<FormSection>
						<Input label="Password" id="password" name="password" type="password"/>
					</FormSection>

					<FormSection>
						<Submit>Save</Submit>
					</FormSection>

				</form>

			</div>

		);
	}

}

export default MyProfile;