import React, {Component} from 'react';
import './customers.css';

class Customers extends Component {

	constructor() {

		super();

		//Setup default state
		this.state = {
			customers:        [],
			inputLinkClicked: false,
			inputs:           0
		};

	}

	addInput() {

		this.setState( prevState => ({
			inputs: prevState.inputs + 1
		}) )
	}

	removeInput() {

		if ( this.state.inputs <= 0 ) {
			return;
		}

		this.setState( prevState => ({
			inputs: prevState.inputs - 1
		}) );

	}

	clearInputs() {
		this.setState( {
			inputs: 0
		} );
	}

	componentDidMount() {
		fetch( '/api/customers' )
			.then( res => res.json() )
			.then( customers => {
				this.setState( {
					customers: customers,
				} );
			} );
	}

	getInputs() {

		const inputs = [];

		for ( let i = 0; i < this.state.inputs; i++ ) {
			inputs.push( (<input key={i} type="text"/>) )
		}

		return inputs;

	}

	render() {

		return this.state.customers.length ? (
			<div>
				<h2>Customers</h2>
				<ul>
					{this.state.customers.map( customer =>
						<li key={customer.id}>{customer.firstName} {customer.lastName}</li>
					)}
				</ul>
				{this.getInputs()}
				<button
					type="button"
					className="make-button-link"
					href="#"
					onClick={this.addInput.bind( this )}
				>
					Add
				</button>
				<button
					type="button"
					className="make-button-link"
					href="#"
					onClick={this.removeInput.bind( this )}
				>
					Remove
				</button>
				<button
					type="button"
					className="make-button-link"
					href="#"
					onClick={this.clearInputs.bind( this )}
				>
					Remove all
				</button>


			</div>
		) : (<span>Loading...</span>);
	}
}

export default Customers;
