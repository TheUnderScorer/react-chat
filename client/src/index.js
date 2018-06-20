import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './assets/css/general.css';
import Routes from "./components/Routes";

ReactDOM.render( (
	<Router>
		<Routes/>
	</Router>
), document.getElementById( 'root' ) );

