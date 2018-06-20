import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './home/Home';
import Login from "./auth/Login";
import Container from "./Container";
import Register from "./auth/Register";

class Routes extends Component {

	render() {

		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/login">
					<Container className="login">
						<Login/>
					</Container>
				</Route>
				<Route path="/register">
					<Container className="register">
						<Register/>
					</Container>
				</Route>
			</Switch>
		)

	}

}

export default Routes;