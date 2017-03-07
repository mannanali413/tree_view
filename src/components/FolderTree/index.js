import React from 'react';

import TreeNode from '../TreeNode';

class FolderTree extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let { onToggle, allNodes, selectedNodeFullPath } = this.props,
            data = allNodes["/"];
        if(!Array.isArray(data)){ data = [data]; }
        return (
            <ul className="tree" ref="treeBase">
                {data.map((node, index) =>
                    <TreeNode key={node.id || index} node={node} onToggle={onToggle} allNodes={allNodes} selectedNodeFullPath={selectedNodeFullPath}/>
                )}
            </ul>
        );
    }
}

FolderTree.propTypes = {
    data: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    onToggle: React.PropTypes.func,
};

export default FolderTree;