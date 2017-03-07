import { handleActions } from 'redux-actions'

import * as constants from './constants';
import { createFilesHolderObj, createSubDirectoryObj } from './services';

const defaultState = {
	nodes: {
		"/" : {
			active: true,
			toggled: false,
			hasChildren: true,
			children: null,
			name: '/',
			fullPath: '/',
			uid: '/',
			terminal: false
		}
	},
	selectedNodeFullPath: "/",
	fileContent: "",
	error: false,
	loading: false
}

export default handleActions(Object.assign({}, {
	
	[constants.GET_S3_DATA] (state, action){
		let newState = Object.assign({}, state);
		let { toggledNode, s3Response } = action.payload;
		let clonedNode = Object.assign({}, toggledNode);
		clonedNode.toggled = !clonedNode.toggled;

		let bucketContents = s3Response['ListBucketResult'],
			bucketPrefix = bucketContents['Prefix'][0],
			bucketFiles = bucketContents['Contents'],
			bucketCommonPrefixes = bucketContents['CommonPrefixes'],
			fileNames = [], fileNodes = {},
			folderNames = [], folderNodes = {};
		
		if(bucketFiles && bucketFiles.length > 0){
			fileNodes = createFilesHolderObj(bucketFiles, bucketPrefix);
			fileNames = Object.keys(fileNodes);
		}
		if(bucketCommonPrefixes && bucketCommonPrefixes.length > 0){
			folderNodes = createSubDirectoryObj(bucketCommonPrefixes, bucketPrefix);
			folderNames = Object.keys(folderNodes);
		}
		clonedNode = Object.assign({}, clonedNode, {
			children: [...fileNames, ...folderNames],
			hasChildren: fileNames.length >0 || folderNames.length > 0
		});

		console.log(clonedNode);

		let updatedNodes = Object.assign({}, newState.nodes, {[clonedNode.fullPath]: clonedNode}, fileNodes, folderNodes)
		return Object.assign({}, newState, {
			nodes: updatedNodes, 
			selectedNodeFullPath: clonedNode.uid, 
			fileContent: '',
			error: false
		});
	},

	[constants.GET_FILE_DATA] (state, action){
		let newState = Object.assign({}, state);
		if(action.error){
			return Object.assign({}, state, {
				error: true,
				fileContent: JSON.stringify(action.payload)
			})
		}
		else{
			let { toggledNode, s3Response } = action.payload;
			return Object.assign({}, state, {
				selectedNodeFullPath: toggledNode.uid, 
				fileContent: s3Response.text,
				error: false
			});
		}

	},

	[constants.TOGGLE_NODE_STATE] (state, action){
		let newState = Object.assign({}, state);
		let toggledNode = Object.assign({}, action.payload);
		toggledNode.toggled = !toggledNode.toggled;
		let updatedNodes = Object.assign({}, newState.nodes, {[toggledNode.fullPath]: toggledNode});
		return Object.assign({}, newState, {
			nodes: updatedNodes, 
			selectedNodeFullPath: toggledNode.uid, 
			fileContent: '',
			error: false
		});
	}

}), defaultState);