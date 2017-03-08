import React from 'react'
import ReactDOM from 'react-dom'

import FolderTree from '../../components/FolderTree'
import FileViewer from '../../components/FileViewer'
import Loader from '../../components/Loader'
import autobind from 'autobind-decorator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

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
                actions.makeRequest(actions.getS3Files.bind(null, node));
            }
        }
        else {
            actions.makeRequest(actions.getFileDataToView.bind(null, node));
        }
    }

    render(){
        let {allNodes, selectedNodeUID, fileContent, error, loading} = this.props;
        return (
            <div>
                <div className="component">
                   <FolderTree selectedNodeUID={selectedNodeUID} onToggle={this.onToggle} allNodes={allNodes}/>
                </div>
                <div className="component">
                    <FileViewer fileContent={fileContent} error={error}/>
                </div>
                <Loader loading={loading}/>
            </div>

        );
    }
}

const getAllNodes = (state) => state.nodes
const getSelectedNodeUID = (state) => state.selectedNodeUID
const getFileContent = (state) => state.fileContent
const hasError = (state) => state.error
const isLoading = (state) => state.loading

const mapStateToProps = (state) => (
    {
        allNodes: getAllNodes(state),
        selectedNodeUID: getSelectedNodeUID(state),
        fileContent: getFileContent(state),
        error: hasError(state),
        loading: isLoading(state)
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators(actions, dispatch)
    }
)    


export default connect(mapStateToProps, mapDispatchToProps)(App);