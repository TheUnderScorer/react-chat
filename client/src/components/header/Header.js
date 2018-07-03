import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from "./Avatar";
import Api from "../../helpers/Api";
import MyProfile from '../my-profile/MyProfile';
import Loader from "../loader/Loader";

import './css/header.css';
import PageBox from "../page-box/PageBox";

class Header extends Component {

	static instances = [];

	static defaultProps = {
		avatarUrl: undefined,
	};

	static propTypes = {
		avatarUrl: PropTypes.string,
	};

	constructor() {

		super();

		this.state = {
			isLoading:        false,
			isEditingProfile: false,
		};

		Header.instances.push( this );

	}

	logout() {
		this.setState( { isLoading: true } );
		Api.get( '/logout' ).then( result => window.location.reload() )
	}

	setEditProfile() {
		this.setState( {
			isEditingProfile: true
		} )
	}

	unsetEditProfile() {
		this.setState( {
			isEditingProfile: false,
		} )
	}

	getSubmenu() {

		let state = this.state;

		if ( state.isEditingProfile ) {
			return (
				<PageBox
					return={() => this.unsetEditProfile()}
					className="sub-menu"
					big={true}>
					<MyProfile/>
				</PageBox>
			)
		} else {
			return (
				<ul className="sub-menu">

					<Loader visible={state.isLoading}/>

					<li onClick={e => this.setEditProfile()}>
						<span>My profile</span>
					</li>

					<li onClick={e => this.logout()}>
						<span>Logout</span>
					</li>
				</ul>
			)
		}

	}

	render() {

		let props = this.props,
			state = this.state;

		return (

			<header className="header">

				<section className="logo">
					<img src="" alt="Logo"/>
				</section>

				<section className={state.isEditingProfile ? 'profile has-sub-menu active' : 'profile has-sub-menu'}>
					<Avatar avatarUrl={props.avatarUrl}/>
					{this.getSubmenu()}
				</section>

			</header>

		)

	}

}

export default Header;