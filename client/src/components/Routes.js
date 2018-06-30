import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Home from './home/Home';
import Container from "./Container";
import Register from "./auth/Register";
import PageBox from "./page-box/PageBox";
import MyProfile from "./my-profile/MyProfile";
import CreateChat from "./chat/create-chat/CreateChat";

class Routes extends Component {

	render() {
		return (
			<Switch>
				<Route exact path="/">
					<Home/>
				</Route>

				<Route path="/register">
					<Container className="register">
						<PageBox return="/">
							<Register/>
						</PageBox>
					</Container>
				</Route>

				<Route path="/my-profile">
					<MyProfile/>
				</Route>

				<Route path="/create-chat">
					<CreateChat/>
				</Route>

			</Switch>
		)
	}

}

export default Routes;