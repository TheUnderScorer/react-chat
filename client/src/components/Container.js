import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Container extends Component {

	render() {
		return (
			<div className={'container ' + this.props.className}>{this.props.children}</div>
		)
	}

}

Container.defaultProps = {
	className: ''
};

Container.propTypes = {
	className: PropTypes.string
};

export default Container;