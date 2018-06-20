import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Container extends Component {

	static defaultProps = {
		className: ''
	};

	static propTypes = {
		className: PropTypes.string
	};

	render() {
		return (
			<div className={'container ' + this.props.className}>{this.props.children}</div>
		)
	}

}

export default Container;