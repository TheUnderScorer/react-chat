import React from 'react';
import Form from '../form/Form';
import PropTypes from 'prop-types';
import Api from "../../helpers/Api";
import Loader from "../loader/Loader";
import PageBox from "../page-box/PageBox";
import FormSection from "../form/FormSection";
import Input from "../form/Input";
import Header from "../header/Header";
import Container from '../Container';
import {Redirect} from 'react-router-dom';
import Upload from "../form/Upload";

class MyProfile extends Form {

	constructor() {

		super();

		this.state.user = {};
		this.state.redirect = false;

	}

	componentDidMount() {

		//We always set this state before performin fetch call to display loader
		this.setState( { isLoading: true } );

		Api.isLoggedIn().then( data => {

			this.setState( {
				isLoggedIn: data.result,
				isLoading:  false,
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
					redirect: true,
				} );
			}

		} )

	}

	render() {

		let state = this.state;

		if ( state.redirect ) {
			return <Redirect to="/"/>
		}

		return (
			<div className="fixed-height">
				<Header {...state.user}/>
				<Container className="my-profile">
					<PageBox title="Edit profile" return="/">
						<Loader visible={state.isLoading}/>
						<form className="form" id="edit_profile_form">

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
								<Upload label="Avatar" type="image"/>
							</FormSection>

						</form>
					</PageBox>
				</Container>
			</div>
		);
	}

}

export default MyProfile;