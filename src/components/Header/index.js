import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let { node } = this.props;
        if(!node){
            return null;
        }
        const iconType = node && node.hasChildren ? 'folder' : 'file-text';
        const iconClass = `fa fa-${iconType}`;
        return (
            <div className="tree__node__header">
                <div className="tree__node__header-title">
                    <i className={iconClass} style={{marginRight: '5px'}}/>
                    { node ? node.name: null }
                </div>
            </div>
        );    
    }
}

Header.propTypes = {
    node: React.PropTypes.object.isRequired
}