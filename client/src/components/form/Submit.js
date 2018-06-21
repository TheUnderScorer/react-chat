import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/submit.css';

class Submit extends Component {

	render() {
		return (
			<button type="submit">{this.props.children}</button>
		);
	}

}

export default Submit;