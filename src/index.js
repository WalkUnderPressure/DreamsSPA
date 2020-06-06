const COMMON = require('../COMMON');
const fetch = require('node-fetch');

const xFetch = (url, data, method) => {
    const path = `${COMMON.DOMAIN}:${COMMON.PORT}${url}`;
    const request = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (method == "POST" || method=='DELETE'){
        request.body = JSON.stringify(data);
    }
    return fetch(path, request)
        .then(res => {
            return res.json()
        });
}

const xSave = (url,data)=>{
    const method = 'POST';
    return xFetch(url,data,method);
}

const xRead = (url,data,method)=>{
    const target_method = method || 'GET';
    return xFetch(url,data,target_method);
}

const xDelete = (url,data)=>{
    const method = 'DELETE';
    return xFetch(url,data,method);
}

module.exports.xFetch = xFetch;
module.exports.xSave = xSave;
module.exports.xRead = xRead;
module.exports.xDelete = xDelete;