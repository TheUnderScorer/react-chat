import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Container extends Component {

	static defaultProps = {
		className: '',
		centered: true,
	};

	static propTypes = {
		className: PropTypes.string,
		centered: PropTypes.bool
	};

	render() {

		let props = this.props,
			classes = props.className;

		if(props.centered){
			classes += ' centered';
		}

		return (
			<div className={'container ' + classes}>{this.props.children}</div>
		)
	}

}

export default Container;