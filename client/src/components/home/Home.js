import React, {Component} from 'react';
import Api from '../../helpers/Api';
import Login from '../auth/Login';
import Container from '../Container';

class Home extends Component {

	constructor() {

		super();

		this.state = {
			isLoggedIn: null,
		}

	}

	componentDidMount() {

		Api.isLoggedIn().then( data => this.setState( {
			isLoggedIn: data.result
		} ) )

	}

	render() {

		if ( !this.state.isLoggedIn ) {
			return (
				<Container className='login'>
					<Login/>
				</Container>
			)
		} else {
			//Chat stuff
		}

	}

}

export default Home;