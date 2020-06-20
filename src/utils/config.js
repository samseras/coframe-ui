let get = function (url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(null)
      }
    }
    xhr.onerror = function () {
      reject(null)
    }
    xhr.send(null)
  })
}

export default async (vue) => {
  let resp =  await get('/config/app-config.json')
  if(resp){
    vue.config.title = resp.title || ''
    vue.config.shortTitle = resp.shortTitle || ''
  }
}
