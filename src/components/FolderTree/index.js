import React from 'react';

import TreeNode from '../TreeNode';

class FolderTree extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let { onToggle, allNodes, selectedNodeUID } = this.props,
            data = allNodes["/"];
        if(!Array.isArray(data)){ data = [data]; }
        return (
            <ul className="tree" ref="treeBase">
                {data.map((node, index) =>
                    <TreeNode key={node.id || index} node={node} onToggle={onToggle} allNodes={allNodes} selectedNodeUID={selectedNodeUID}/>
                )}
            </ul>
        );
    }
}

FolderTree.propTypes = {
    allNodes: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    onToggle: React.PropTypes.func,
    selectedNodeUID: React.PropTypes.string
};

export default FolderTree;