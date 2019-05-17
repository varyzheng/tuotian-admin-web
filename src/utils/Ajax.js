import Cookie from './Cookie'
import { jsonToQueryString } from '@/utils/QueryString'
import { message } from 'antd'

export const $ajax = (url, data, { contentType = 'application/json', token = 'token', method = 'GET', credentials = 'same-origin', mode = 'cors', redirect = 'follow' } = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", contentType);
  myHeaders.append("Token", Cookie.get(token));
  method = method.toUpperCase()
  const options = {
    method, // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache',
    credentials, // include, same-origin, *omit
    headers:myHeaders,
    mode, // no-cors, cors, *same-origin
    redirect, // manual, *follow, error
  }
  if (method !== 'HEAD' && method !== 'GET') {
    options.body = JSON.stringify(data)
  } else {
    if (data) {
      url = `${url}?${jsonToQueryString(data)}`
    }
  }
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        if (data.code >= 400) {
          reject(data)
          message.error(data.message);
          console.log('exception------:', data.exception)
        }
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
  })
}

export const $get = (url, data, options = {}) => {
  options.method = 'GET'
  return $ajax(url, data, options)
}

export const $post = (url, data, options = {}) => {
  options.method = 'POST'
  return $ajax(url, data, options)
}
