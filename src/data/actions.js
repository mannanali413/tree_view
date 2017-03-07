import { createAction } from 'redux-actions';

import * as constants from './constants';
import request from 'superagent'
import { getS3QueryUrl, getS3FilesUrl } from './services';
var parseString = require('xml2js').parseString;

export const getS3Files = createAction(constants.GET_S3_DATA, payload => new Promise((resolve, reject) => {
	let S3_URL = getS3QueryUrl(payload.fullPath);
	request.get(S3_URL)
			.end((err, res) => {
				if(err){
					console.log(err);
					reject(err);
				} 

				if(res.statusCode == 200){
					let result = res;
					parseString(result.text, function (err, res) {
    					resolve({
    						toggledNode: payload,
    						s3Response: res
    					});
					});
				}
				else{
					console.log(res);
					reject(res.body);
				}
			})
	
}))

export const getFileDataToView = createAction(constants.GET_FILE_DATA, payload => new Promise((resolve, reject) => {
	let FILE_URL = getS3FilesUrl(payload.fullPath);
	request.get(FILE_URL)
			.end((err, res) => {
				if(err){
					console.log(err);
					reject(err);
				}

				if(res.statusCode == 200){
					resolve({
						toggledNode: payload,
						s3Response: res	
					});
				}
				else {
					console.log(res);
					reject(res);
				}
			})
}))

export const toggleNode = createAction(constants.TOGGLE_NODE_STATE)