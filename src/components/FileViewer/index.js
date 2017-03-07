import React, { Component } from 'react'

require('./styles.scss')

const DEFAULT_CONTENT = 'Please select a file to view its content'

export default class FileViewer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let content = this.props.fileContent;
        if(!content){ content = DEFAULT_CONTENT; }
        let className = "viewer__contents"
        if(this.props.error){
            className = `${className} color__red`
        }
        return (
            <div className={className}>
                {content}
            </div>
        );
    }
}

FileViewer.propTypes = {
    fileContent: React.PropTypes.string,
    error: React.PropTypes.boolean
};