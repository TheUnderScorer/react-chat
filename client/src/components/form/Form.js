import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Form class that can be extended by components that use form
 * */
class Form extends Component {

	constructor() {

		super();

		this.state = {
			isLoading: false,
			messages:  [],
			result:    false,
		}

	}

}

export default Form;