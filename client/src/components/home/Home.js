import React, { Component } from 'react';
import Api from '../../helpers/Api';
import Login from '../auth/Login';
import Container from '../Container';
import Header from "../header/Header";
import Loader from "../loader/Loader";
import PageBox from "../page-box/PageBox";
import Button from '@material-ui/core/Button/Button';
import AddIcon from '@material-ui/icons/Add';
import ChatsList from "../chat/ChatsList";
import { Link } from 'react-router-dom';

import './home.css';

class Home extends Component {

	static instances = [];

	/**
	 * Update user data on all home instances
	 *
	 * @param {Object} user
	 *
	 * @return void
	 * */
	static updateUser( user ) {

		for ( let instance of Home.instances ) {
			instance.setState( {
				user: user
			} );
		}

	}

	constructor() {

		super();

		this.state = {
			isLoggedIn: null,
			isLoading:  true,
			user:       {},
			chats:      {},
		};

		Home.instances.push( this );

	}

	componentDidMount() {

		//We always set this state before performin fetch call to display loader
		this.setState( { isLoading: true } );

		Api.isLoggedIn().then( data => {
			this.setState( {
				isLoggedIn: data.result,
				isLoading:  false,
			} );

			if ( data.result ) {

				this.setState( { isLoading: true } );
				
				Api.getCurrentUser().then( data => {
					this.setState( {
						user: data.result,
					} );
				} );

				Api.getUserChats().then( data => {
					this.setState( {
						isLoading: false,
						chats:     data.result
					} );
				} )

			}
		} )

	}

	render() {

		let state = this.state;

		if ( !state.isLoggedIn ) {
			return (
				<Container className='login'>
					<Login/>
				</Container>
			)
		} else {
			return (
				<div className="fixed-height">
					<Header avatarUrl={state.user.avatarUrl}/>

					<Container className="home">
						<PageBox>
							<Loader visible={state.isLoading}/>
							<ChatsList chats={state.chats}/>
						</PageBox>
					</Container>

					<Button className="floating-button" variant="fab" color="primary" aria-label="add">
						<Link to="/create-chat">
							<AddIcon/>
						</Link>
					</Button>

				</div>
			)
		}

	}

}

export default Home;