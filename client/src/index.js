import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home';

ReactDOM.render( (
	<Router>
		<Route path="/">
			<Home />
		</Route>
	</Router>
), document.getElementById( 'root' ) );

