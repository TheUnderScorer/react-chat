import React, {Component} from 'react';
import Api from '../../helpers/Api';
import Login from '../auth/Login';
import Container from '../Container';
import Header from "../header/Header";
import Loader from "../loader/Loader";

class Home extends Component {

	constructor() {

		super();

		this.state = {
			isLoggedIn: null,
			isLoading:  true,
		}

	}

	componentDidMount() {

		this.setState( { isLoading: true } );
		Api.isLoggedIn().then( data => {
			this.setState( {
				isLoggedIn: data.result,
				isLoading:  false,
			} )
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
				<div>
					Logged in!!
				</div>
			)
		}

	}

}

export default Home;