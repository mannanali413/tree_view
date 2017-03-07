import React, { Component } from 'react'

export default class Toggle extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="tree__node__toggle">
	        	<div className="tree__node__toggle-wrapper">
	            	<svg height="14" width="14">
	                	<polygon points="0,0 0,14 14,7" className="tree__node__toggle-arrow"/>
	            	</svg>
	        	</div>
	    	</div>
		)
	}
} 
    
