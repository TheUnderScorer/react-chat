import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import './css/submit.css';

class Submit extends Component {

	render() {
		return (
			<Button variant="raised" type="submit" color="primary">
				{this.props.children}
			</Button>
		);
	}

}

export default Submit;