import axios from 'axios'
import { AUTH_LOGIN } from './authActionTypes'
import { API_ENDPOINT_AUTH_LOGIN } from './authEndpoints'

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
    .then(res => dispatch(authLoginSuccess(res.data.data)))
    .catch(error => dispatch(authLoginFailure(error)))
}
