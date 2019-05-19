export const jsonToQueryString = (data) => {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    let str = ''
    Object.keys(data).forEach(key => {
      str += `${key}=${data[key]}&`
    })
    return str.substring(0, str.length - 1)
  } else {
    throw new Error('argument of this method must be a pure Object, array and other types is not allowd')
  }
}
