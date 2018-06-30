import React, {Component} from 'react';
import './page-box.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


class PageBox extends Component {

	static defaultProps = {
		return: '',
		title:  '',
		big:    false,
	};

	static propTypes = {
		return: PropTypes.string,
		title:  PropTypes.string,
		big:    PropTypes.bool
	};

	render() {

		let props = this.props;
		return (
			<div className={props.big ? 'page-box big' : 'page-box'}>
				{props.return &&
				<Link to={props.return} className="return">
					<i className="material-icons">arrow_back</i>
				</Link>
				}
				{props.title &&
				<h1 className="box-title">
					{props.title}
				</h1>
				}
				{props.children}
			</div>
		)

	}

}

export default PageBox;