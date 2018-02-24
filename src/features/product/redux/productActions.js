import axios from 'axios'
import { FETCH_PRODUCT_LIST, RELOAD_GITHUB_PROFILE } from './productActionTypes'
import { API_ENDPOINT_GITHUB_PROFILE } from './productEndpoints'

export const fetchProductListRequest = (key) => ({ type: FETCH_PRODUCT_LIST.REQUEST, key }) 
export const fetchProductListSuccess = (key, data) => ({ type: FETCH_PRODUCT_LIST.SUCCESS, data, key }) 
export const fetchProductListFailure = (key, error) => ({ type: FETCH_PRODUCT_LIST.FAILURE, error, key }) 
export const fetchProductList = (key) => (dispatch) => {
  dispatch(fetchProductListRequest(key))
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_GITHUB_PROFILE(key),
  })
    .then(res => dispatch(fetchProductListSuccess(key, res.data)))
    .catch(error => dispatch(fetchProductListFailure(key, error)))
}

export const reloadGithibProfile = (key) => ({ type: RELOAD_GITHUB_PROFILE, key })

export const handleGithubProfile = (key) => async (dispatch) => {
  await dispatch(reloadGithibProfile(key))
  await dispatch(fetchProductList(key))
} 