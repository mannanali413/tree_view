import React from 'react'
import ReactDOM from 'react-dom'

import FolderTree from '../../components/FolderTree'
import FileViewer from '../../components/FileViewer'
import autobind from 'autobind-decorator'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../data/actions'

require('./styles.scss');

@autobind
class App extends React.Component {
    constructor(props){
        super(props);
    }

    onToggle(node, toggled){
        let { actions } = this.props;
        if(node.hasChildren){
            if(node.children && node.children.length > 0){
                actions.toggleNode(node);
            }
            else{
                actions.getS3Files(node);
            }
        }
        else {
            actions.getFileDataToView(node);
        }
    }

    render(){
        let {allNodes, selectedNodeFullPath, fileContent, error} = this.props;
        return (
            <div>
                <div className="component">
                   <FolderTree selectedNodeFullPath={selectedNodeFullPath} onToggle={this.onToggle} allNodes={allNodes}/>
                </div>
                <div className="component">
                    <FileViewer fileContent={fileContent} error={error}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => (
    {
        allNodes: state.nodes,
        selectedNodeFullPath: state.selectedNodeFullPath,
        fileContent: state.fileContent,
        error: state.error
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators(actions, dispatch)
    }
)    


export default connect(mapStateToProps, mapDispatchToProps)(App);