import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from "../../form/Form";
import Loader from "../../loader/Loader";
import FormSection from "../../form/FormSection";
import Input from "../../form/Input";
import Container from "../../Container";
import PageBox from "../../page-box/PageBox";

class CreateChat extends Form {

	handleSubmit() {

	}

	render() {

		let state = this.state;

		return (
			<Container className="create-chat">
				<PageBox>
					<form onSubmit={this.handleSubmit.bind( this )}>

						{state.isLoggedIn && <Loader/>}

						<FormSection>
							<Input/>
						</FormSection>

					</form>
				</PageBox>
			</Container>
		);
	}

}

export default CreateChat;