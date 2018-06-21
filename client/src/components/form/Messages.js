import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/messages.css';

class Messages extends Component {

	static defaultProps = {
		messages: []
	};

	static propTypes = {
		messages: PropTypes.array
	};

	render() {

		let props    = this.props,
			messages = props.messages.map( ( message, index ) =>
				<div key={index} className={'message '+message.type}>{message.message}</div>
			);

		return (
			<div className="messages">
				{messages}
			</div>
		);
	}

}

export default Messages;