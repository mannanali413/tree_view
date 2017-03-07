import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import autobind from 'autobind-decorator';
import defaultAnimations from '../../animations';

import NodeHeader from '../NodeHeader';

@autobind
class TreeNode extends React.Component {
    constructor(props){
        super(props);
    }
    onClick(){
        let toggled = !this.props.node.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
    }
    render(){
        return (
            <li className="tree__node" ref="topLevel">
                {this.renderHeader()}
                {this.renderDrawer()}
            </li>
        );
    }
    renderDrawer(){
        let animations = defaultAnimations;
        const toggled = this.props.node.toggled;
        if(!toggled){ return null; }
        return (
            <VelocityTransitionGroup enter={{animation: 'slideDown', duration: 300}}
                leave={{animation: 'slideUp', duration: 300}}
                ref="velocity">
                { this.renderChildren() }
            </VelocityTransitionGroup>
        );
    }
    renderHeader(){
        return (
            <NodeHeader node={Object.assign({}, this.props.node)} onClick={this.onClick} selectedNodeFullPath={this.props.selectedNodeFullPath}/>
        );
    }
    renderChildren(){
        if(!this.props.node) return null;
        
        if(this.props.node.loading){ return this.renderLoading(); }
        let children = this.props.node.children;
        if (!Array.isArray(children)) { children = children ? [children] : []; }
        let allNodes = this.props.allNodes;
        return (
            <ul className="tree__node__subtree" ref="subtree">
                {children.map((child, index) => 
                        <TreeNode {...this._eventBubbles()} key={child.id || index} node={allNodes[child]} allNodes={allNodes} selectedNodeFullPath={this.props.selectedNodeFullPath}/>
                )}
            </ul>
        );
    } 
    renderLoading(){
        return (
            <ul className="tree__node__subtree">
                <li>
                   <div className="tree__node__loading">loading...</div>
                </li>
            </ul>
        );
    }

    _eventBubbles(){
        return { onToggle: this.props.onToggle };
    }
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func
};

export default TreeNode;