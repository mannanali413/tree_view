import React, {Component} from 'react'

export default class Loader extends Component {
	constructor(props){
		super(props)
	}

	render(){
		if(this.props.loading){
			return (
	        	<div className="js-modal fade in overlay-loader"></div>
    		);		
		}
		else{
			return null;
		}
	}
}

Loader.propTypes = {
	loading: React.PropTypes.bool
}