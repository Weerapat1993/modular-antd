import axios from 'axios'
import { FETCH_ARTICLE_LIST } from './articleActionTypes'
import { API_ENDPOINT_ARTICLE_LIST } from './articleEndpoints'

export const fetchArticleListRequest = () => ({ type: FETCH_ARTICLE_LIST.REQUEST }) 
export const fetchArticleListSuccess = (data) => ({ type: FETCH_ARTICLE_LIST.SUCCESS, data }) 
export const fetchArticleListFailure = (error) => ({ type: FETCH_ARTICLE_LIST.FAILURE, error }) 
export const fetchArticleList = () => (dispatch) => {
  dispatch(fetchArticleListRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_ARTICLE_LIST(),
  })
    .then(res => dispatch(fetchArticleListSuccess(res.data.data)))
    .catch(error => dispatch(fetchArticleListFailure(error)))
}