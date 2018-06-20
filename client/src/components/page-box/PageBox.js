import React, {Component} from 'react';
import './page-box.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


class PageBox extends Component {

	static defaultProps = {
		return: ''
	};

	static propTypes = {
		return: PropTypes.string
	};

	render() {
		return (
			<div className="page-box">
				{this.props.return &&
				<Link to={this.props.return} className="return">
					<i className="material-icons">arrow_back</i>
				</Link>
				}
				{this.props.children}
			</div>
		)
	}

}

export default PageBox;