import React from 'react';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

import Header from '../Header';
import Toggle from '../Toggle';
import { VelocityComponent } from 'velocity-react';
import animations from '../../animations'


export default class NodeHeader extends React.Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);
        for(let i = 0; i < nextPropKeys.length; i++){
            const key = nextPropKeys[i];
            if(key === 'animations'){ continue; }
            const isEqual = shallowEqual(props[key], nextProps[key]);
            if(!isEqual){ return true; }
        }
        return false;
    }
    render(){
        const { node, selectedNodeUID } = this.props;
        const terminal = node && !node.hasChildren && !node.children && node.name !== '/';
        let nodeClassName = "tree__node__link";
        if(node.uid == selectedNodeUID){
            nodeClassName = `${nodeClassName} tree__node__activeLink`
        }
        return (
            <div ref="clickable" onClick={this.props.onClick} className={nodeClassName}>
                { !terminal ? this.renderToggle() : null }
                <Header node={node}/>
            </div>
        );
    }
    renderToggle(){
        let animObj = {
            rotateZ: 0
        }
        if(this.props.node.toggled){
            animObj['rotateZ'] = 90;
        }
        return(
            <VelocityComponent ref="velocity" duration="500" animation={animObj}>
                <Toggle/>
            </VelocityComponent>
        )
    }
}

NodeHeader.propTypes = {
    node: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
};