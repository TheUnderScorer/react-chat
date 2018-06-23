import React, {Component} from 'react';
import PropTypes from 'prop-types';
import placeholder from './img/user.png';
import './css/avatar.css';

class Avatar extends Component {

	static defaultProps = {
		avatarUrl: placeholder
	};

	static propTypes = {
		avatarUrl: PropTypes.string,
	};

	render() {
		return (
			<div className="avatar">
				<img src={this.props.avatarUrl} alt=""/>
			</div>
		);
	}

}

export default Avatar;