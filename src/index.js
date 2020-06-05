const common = require('../COMMON');
const domain = common.DOMAIN;


xFetch = (url, data, method) => {
    const path = `${domain}${url}`;
    
    fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(
            res => { return res.json() })
}

xRead = (url,data)=>{
    const method = 'GET';
    xFetch(url,data,method);
}

xDelete = (url,data)=>{
    const method = 'DELETE';
    xFetch(url,data,method);
}

xSave = (url,data)=>{
    const method = 'POST';
    xFetch(url,data,method);
}

module.exports.xRead = xRead;
module.exports.xSave = xSave;
module.exports.xFetch = xFetch;
module.exports.xDelete = xDelete;