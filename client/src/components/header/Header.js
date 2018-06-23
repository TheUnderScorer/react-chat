import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/header.css';
import Avatar from "./Avatar";

class Header extends Component {

	static defaultProps = {
		email:     '',
		login:     '',
		role:      '',
		avatarUrl: undefined,
		verified:  false,
		_id:       ''
	};

	static propTypes = {
		email:     PropTypes.string,
		login:     PropTypes.string,
		role:      PropTypes.string,
		avatarUrl: PropTypes.string,
		verified:  PropTypes.bool,
		_id:       PropTypes.string
	};

	render() {

		let props = this.props;

		return (
			<header className="header">
				<section className="logo">
					<img src="" alt="Logo"/>
				</section>
				<section className="profile">
					<Avatar avatarUrl={props.avatarUrl}/>
				</section>
			</header>
		)

	}

}

export default Header;