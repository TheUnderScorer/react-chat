import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Home from './home/Home';
import Container from "./Container";
import Register from "./auth/Register";
import PageBox from "./page-box/PageBox";

class Routes extends Component {

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home}/>

				<Route path="/register">
					<Container className="register">
						<PageBox return="/">
							<Register/>
						</PageBox>
					</Container>
				</Route>

			</Switch>
		)
	}

}

export default Routes;