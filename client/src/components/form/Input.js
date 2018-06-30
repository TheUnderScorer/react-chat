import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

	constructor() {
		super();

		this.state = {
			value: '',
		}

	}

	static defaultProps = {
		name:        '',
		id:          '',
		type:        'text',
		value:       '',
		label:       '',
		checked:     false,
		disabled:    false,
		placeholder: '',
	};

	static propTypes = {
		name:        PropTypes.string,
		id:          PropTypes.string,
		type:        PropTypes.string,
		value:       PropTypes.any,
		label:       PropTypes.string,
		checked:     PropTypes.bool,
		disabled:    PropTypes.bool,
		placeholder: PropTypes.string
	};

	handleChange( e ) {
		this.setState( {
			value: e.target.value,
		} )
	}

	getInput() {

		let props = this.props,
			state = this.state;

		if ( props.type === 'checkbox' || props.type === 'radio' ) {
			return (
				<input
					key="1"
					placeholder={props.placeholder}
					className={'md-' + props.type}
					type={props.type}
					name={props.name}
					id={props.id}
					value={props.value}
					defaultValue={props.value}
					defaultChecked={props.checked ? 'checked' : ''}
				/>);
		} else {

			let value = state.value === '' ? props.value : state.value;

			return (
				<input
					key="1"
					type={props.type}
					placeholder={props.placeholder}
					name={props.name}
					id={props.id}
					value={value}
					disabled={props.disabled}
					onChange={this.handleChange.bind( this )}
				/>);
		}

	}

	render() {

		let props = this.props;

		return [ <label key="0" htmlFor={props.name}>{props.label}</label>, this.getInput() ];
	}

}

export default Input;