const S3B_ROOT_DIR = '';
const S3BL_IGNORE_PATH = false;
let S3_REST_URL = 'http://data.openspending.org.s3-eu-west-1.amazonaws.com/';

export const getS3QueryUrl = (prefix) => {

  let TEMP_S3_REST_URL = 'http://data.openspending.org.s3-eu-west-1.amazonaws.com';
  
  TEMP_S3_REST_URL += '?delimiter=/';

  var rx = '.*[?&]prefix=' + S3B_ROOT_DIR + '([^&]+)(&.*)?$';
  
  if (prefix && prefix !== '/') {
    // make sure we end in /
    var prefix = prefix.replace(/\/$/, '') + '/';
    TEMP_S3_REST_URL += '&prefix=' + prefix;
  }
  /* if (marker) {
    S3_REST_URL += '&marker=' + marker;
  } */
  return TEMP_S3_REST_URL;
}

export const getS3FilesUrl = (fileName) => {
  return S3_REST_URL + fileName;
}

export const createFilesHolderObj = (contentsArray, prefix) => {
  let tempObj = {};
  for(let i=0; i < contentsArray.length ; i++){
    let content = contentsArray[i],
        contentFullPath = content['Key'][0],
        nodeObj = {
          active: false,
          toggled: false,
          hasChildren: false,
          children: null,
          fullPath: contentFullPath,
        };
        if(contentFullPath === prefix){
          let contentName = contentFullPath,
              uid = `${prefix}${contentFullPath}`;
          nodeObj['name'] = contentName;
          nodeObj['uid'] = uid;
          tempObj[uid] = nodeObj;
        }
        else{
          let contentName = contentFullPath.substr(contentFullPath.indexOf(prefix)+prefix.length),
              uid = `${contentFullPath}`;
          nodeObj['name'] = contentName;
          nodeObj['uid'] = uid;
          tempObj[uid] = nodeObj;
        }
  }
  return Object.assign({}, tempObj);
}

export const createSubDirectoryObj = (commonPrefixesArray, prefix) => {
  let tempObj = {};
  for(let i =0; i < commonPrefixesArray.length; i++){
    let prefixObj = commonPrefixesArray[i],
        prefixFullPath = prefixObj['Prefix'][0],
        nodeObj = {
          active: false,
          toggled: false,
          hasChildren: true,
          children: null,
          fullPath: prefixFullPath
        };
        if(prefixFullPath === prefix){
          let prefixName = prefixFullPath,
              uid = `${prefix}${prefixFullPath}`;
          nodeObj['name'] = prefixName;
          nodeObj['uid'] = uid;
          tempObj[uid] = nodeObj;
        }
        else {
          let prefixName = prefixFullPath.substr(prefixFullPath.indexOf(prefix)+prefix.length),
              uid = `${prefixFullPath}`;
          nodeObj['name'] = prefixName;
          nodeObj['uid'] = uid;
          tempObj[uid] = nodeObj;
        }
  }
  return Object.assign({}, tempObj);
}