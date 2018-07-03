import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UploadIcon from '@material-ui/icons/FileUpload';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import './css/upload.css';
import Loader from "../loader/Loader";

class Upload extends Component {

	static defaultProps = {
		name:     '',
		id:       '',
		files:    [],
		label:    '',
		multiple: false,
		//Allowed types: all, image
		type:     'all',
	};

	static propTypes = {
		name:     PropTypes.string,
		id:       PropTypes.string,
		files:    PropTypes.array,
		label:    PropTypes.string,
		multiple: PropTypes.bool,
		type:     PropTypes.string
	};

	constructor() {

		super();

		this.state = {
			files:         [],
			triggerUpload: false,
			loading:       false,
		};

	}


	triggerUpload() {
		this.setState( { triggerUpload: true } );
	}

	/**
	 * If state is set to true on "triggerUpload" trigger click on file input
	 *
	 * @return void
	 * */
	uploadTriggered( input ) {

		if ( this.state.triggerUpload && input ) {
			input.click();
			this.setState( { triggerUpload: false } );
		}

	}

	handleFile( e ) {

		let files   = [],
			loading = true;

		this.setState( { loading } );

		if ( e.target.files ) {
			for ( let file of e.target.files ) {

				//File is not an image
				if ( file.type.indexOf( 'image' ) === -1 ) {

				} else {
					let url = URL.createObjectURL( file );

					files.push( <img src={url} alt=""/> );
				}

			}
		}

		loading = false;

		this.setState( { files, loading } );

	}

	deleteFile( e, index ) {

		//Create copy, since state items are unmutable
		let files = [ ...this.state.files ];

		files.splice( index, 1 );

		this.setState( { files } );

	}

	render() {

		let props = this.props,
			state = this.state;

		return (

			<div className="upload">
				<Loader visible={state.loading}/>
				<Button variant="outlined" className="upload-icon has-round-button" onClick={e => this.triggerUpload( e )}>
					<UploadIcon/>
					{props.label &&
					<span className="upload-label">
						{props.label}
					</span>
					}
				</Button>

				<div className="upload-items">
					{props.files.map( ( file, index ) =>
						<div className="upload-preview default" key={index} onClick={e => this.deleteFile( e, index )}>
							{file}
							<div className="upload-overlay">
								<DeleteIcon/>
							</div>
						</div>
					)}
					{state.files.map( ( file, index ) =>
						<div className="upload-preview" key={index} onClick={e => this.deleteFile( e, index )}>
							{file}
							<div className="upload-overlay">
								<DeleteIcon/>
							</div>
						</div>
					)}
				</div>

				<input
					type="file"
					multiple={state.multiple}
					name={props.name}
					id={props.id}
					ref={input => this.uploadTriggered( input )}
					onChange={e => this.handleFile( e )}
				/>

			</div>

		);
	}

}

export default Upload;