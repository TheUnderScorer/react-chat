import React, {Component} from 'react';
import Api from './helpers/Api';

class Home extends Component{

	render(){

		let log = Api.isLoggedIn();

		log.then(res => res.json()).then(e => console.log( e ));

		return(
			<div className="home">
				Home
			</div>
		)
	}

}

export default Home;