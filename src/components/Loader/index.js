import React, {Component} from 'react'

export default class Loading extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return (
	        <div className="tree__node__loading">
	            loading...
	        </div>
    	);	
	}
}