import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/header.css';
import Avatar from "./Avatar";
import Api from "../../helpers/Api";
import {Redirect, Link} from 'react-router-dom';
import Loader from "../loader/Loader";

class Header extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: false,
		}
	}

	static defaultProps = {
		email:     '',
		login:     '',
		role:      '',
		avatarUrl: undefined,
		verified:  false,
		_id:       '',
	};

	static propTypes = {
		email:     PropTypes.string,
		login:     PropTypes.string,
		role:      PropTypes.string,
		avatarUrl: PropTypes.string,
		verified:  PropTypes.bool,
		_id:       PropTypes.string,
	};

	logout( e ) {
		this.setState( { isLoading: true } );
		Api.get( '/logout' ).then( result => window.location.reload() )
	}

	render() {

		let props = this.props;

		return (

			<header className="header">

				<section className="logo">
					<img src="" alt="Logo"/>
				</section>

				<section className="profile has-submenu">
					<Avatar avatarUrl={props.avatarUrl}/>
					<ul className="submenu">
						{this.state.isLoading &&
						<Loader/>
						}
						<li>
							<Link to="/my-profile">My profile</Link>
						</li>

						<li onClick={this.logout.bind( this )}>
							<span>Logout</span>
						</li>
					</ul>
				</section>

			</header>

		)

	}

}

export default Header;