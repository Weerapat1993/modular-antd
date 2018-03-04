import axios from 'axios'
import { AUTH_LOGIN, AUTH_LOGOUT } from './authActionTypes'
import { API_ENDPOINT_AUTH_LOGIN, API_ENDPOINT_AUTH_USER_WITH_TOKEN } from './authEndpoints'

export const authLoginRequest = () => ({ type: AUTH_LOGIN.REQUEST }) 
export const authLoginSuccess = (data) => ({ type: AUTH_LOGIN.SUCCESS, data }) 
export const authLoginFailure = (error) => ({ type: AUTH_LOGIN.FAILURE, error }) 
export const authLogin = (data) => (dispatch) => {
  dispatch(authLoginRequest())
  return axios({
    method: 'POST',
    responseType: 'json',
    url: API_ENDPOINT_AUTH_LOGIN(),
    data
  })
    .then(res => {
      const { token } = res.data.data
      localStorage.setItem('jwtToken', token)
      return dispatch(authLoginSuccess(res.data.data))
    })
    .catch(error => dispatch(authLoginFailure(error)))
}

export const getAuthUserWithToken = (token) => (dispatch) => {
  dispatch(authLoginRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_AUTH_USER_WITH_TOKEN(token),
    headers: {
      Authorization: token
    }
  })
    .then(res => {
      const responseData = {
        token,
        user: res.data.data
      }
      return dispatch(authLoginSuccess(responseData))
    })
    .catch(error => dispatch(authLoginFailure(error)))
}

export const authLogout = () => {
  localStorage.removeItem('jwtToken')
  return { type: AUTH_LOGOUT }
}
