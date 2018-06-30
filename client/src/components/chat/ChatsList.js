import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button/Button';

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
				<Link className="has-round-button" to="/create-chat">
					<Button variant="fab" color="primary" aria-label="add"><AddIcon /></Button>
					<span>Create your first chat ;)</span>
				</Link>
			)
		} else{

		}

	}

	render() {
		return (
			<div className="chats">
				{this.getList()}
			</div>
		);
	}

}

export default ChatsList;