import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

	static defaultProps = {
		name:    '',
		id:      '',
		type:    'text',
		value:   '',
		label:   '',
		checked: false
	};

	static propTypes = {
		name:    PropTypes.string,
		id:      PropTypes.string,
		type:    PropTypes.string,
		value:   PropTypes.any,
		label:   PropTypes.string,
		checked: PropTypes.bool
	};

	getInput() {

		let props = this.props;

		if ( props.type === 'checkbox' || props.type === 'radio' ) {
			return (
				<input key="1" className={'md-' + props.type} type={props.type} name={props.name} id={props.id} defaultValue={props.value} defaultChecked={props.checked ? 'checked' : ''}/>);
		} else {
			return (
				<input key="1" type={props.type} name={props.name} id={props.id} defaultValue={props.value}/>);
		}

	}

	render() {

		let props = this.props;

		return [ <label key="0" htmlFor={props.name}>{props.label}</label>, this.getInput() ];
	}

}

export default Input;