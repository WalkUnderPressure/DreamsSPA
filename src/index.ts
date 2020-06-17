import { METHODS, DOMAIN} from '../COMMON'
import fetch, { RequestInit } from 'node-fetch'

export const xFetch = (url : string, data : any, method : METHODS) => {
  const path = `${DOMAIN}${url}`

  const request : RequestInit = {}

  request.method = method;
  request.headers = {
    'Content-Type': 'application/json'
  }

  if (method === METHODS.GET) {
    const urlParameters = Object.entries(data).map(e => e.join('=')).join('&')
  } else {
    request.body = JSON.stringify(data)
  }

  return fetch(path, request)
    .then(res => {
      return res.json()
    })
}

export const xSave = (url : string, data : Object) => {
  return xFetch(url, data, METHODS.POST)
}

export const xRead = (url : string, data : Object, method = METHODS.GET) => {
  return xFetch(url, data, method)
}

export const xDelete = (url : string, data : Object) => {
  return xFetch(url, data, METHODS.DELETE)
}
