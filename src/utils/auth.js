import Cookies from 'js-cookie'
import localStore from 'store'
const TokenKey = `Admin-Token-coframe`

export function getUser() {
  if (localStore.get('user')) return localStore.get('user')
  else return {}
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, params) {
  return Cookies.set(TokenKey, token, params)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeLoginType() {
  return localStore.set('loginType', null)
}
export function setLoginType(loginType) {
  return localStore.set('loginType', loginType)
}
export function isIAM() {
  return localStore.get('loginType') === 'iam'
}
export function isNormal() {
  return localStore.get('loginType') === 'normal'
}
