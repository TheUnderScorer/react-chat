import React, { Component } from 'react';
import './page-box.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


class PageBox extends Component {

	static defaultProps = {
		return:    '',
		title:     '',
		big:       false,
		className: ''
	};

	static propTypes = {
		return:    PropTypes.any,
		title:     PropTypes.string,
		big:       PropTypes.bool,
		className: PropTypes.string
	};

	renderReturn() {

		let inner = <Button variant="raised"><i className="material-icons">arrow_back</i></Button>,
			props = this.props;

		if ( typeof props.return === 'function' ) {
			return (
				<div className="return" onClick={e => props.return( e )}>
					{inner}
				</div>
			);
		} else {
			return (
				<Link to={props.return} className="return">
					{inner}
				</Link>
			)
		}

	}

	render() {

		let props = this.props;

		return (
			<div className={props.big ? `page-box big ${props.className}` : `page-box ${props.className}`}>
				{props.return && this.renderReturn()}
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