import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Add from 'react-icons/lib/md/add';

class ChatsList extends Component {

	static defaultProps = {
		chats: {}
	};

	static propTypes = {
		chats: PropTypes.object
	};

	getList() {

		let props = this.props;

		if ( !props.chats.length ) {
			return (
				<Link className="has-round-icon" to="/create-chat">
					<Add />
					<span>Create your first chat ;)</span>
				</Link>
			)
		}

	}

	render() {
		return (
			<div class="chats">
				{this.getList()}
			</div>
		);
	}

}

export default ChatsList;