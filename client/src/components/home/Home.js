import React, {Component} from 'react';
import Api from '../../helpers/Api';
import Login from '../auth/Login';
import Container from '../Container';
import Header from "../header/Header";
import Loader from "../loader/Loader";
import PageBox from "../page-box/PageBox";

import './home.css';
import ChatsList from "../chat/ChatsList";

class Home extends Component {

	constructor() {

		super();

		this.state = {
			isLoggedIn: null,
			isLoading:  true,
			user:       {},
			chats:      {},
		}

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

		if ( state.isLoading ) {
			return <Loader/>
		}

		if ( !state.isLoggedIn ) {
			return (
				<Container className='login'>
					<Login/>
				</Container>
			)
		} else {
			return (
				<main>
					<Header {...state.user}/>
					<Container className="home">
						<PageBox>
							<ChatsList chats={state.chats}/>
						</PageBox>
					</Container>
				</main>
			)
		}

	}

}

export default Home;