import axios from 'axios'
import { FETCH_ARTICLE_LIST, FETCH_ARTICLE_DEATIL, CREATE_ARTICLE } from './articleActionTypes'
import { API_ENDPOINT_ARTICLE_LIST, API_ENDPOINT_ARTICLE_DETAIL } from './articleEndpoints'

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


export const fetchArticleDetailRequest = (key) => ({ type: FETCH_ARTICLE_DEATIL.REQUEST, key }) 
export const fetchArticleDetailSuccess = (data, key) => ({ type: FETCH_ARTICLE_DEATIL.SUCCESS, data, key }) 
export const fetchArticleDetailFailure = (error, key) => ({ type: FETCH_ARTICLE_DEATIL.FAILURE, error, key }) 
export const fetchArticleDetail = (key) => (dispatch) => {
  dispatch(fetchArticleDetailRequest(key))
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_ARTICLE_DETAIL(key),
  })
    .then(res => dispatch(fetchArticleDetailSuccess(res.data.data, key)))
    .catch(error => dispatch(fetchArticleDetailFailure(error, key)))
}


export const createArticleRequest = (key) => ({ type: CREATE_ARTICLE.REQUEST, key }) 
export const createArticleSuccess = (data, key) => ({ type: CREATE_ARTICLE.SUCCESS, data, key }) 
export const createArticleFailure = (error, key) => ({ type: CREATE_ARTICLE.FAILURE, error, key }) 
export const createArticle = (data) => (dispatch) => {
  dispatch(createArticleRequest())
  return axios({
    method: 'POST',
    responseType: 'json',
    url: API_ENDPOINT_ARTICLE_LIST(),
    data,
  })
    .then(res => dispatch(createArticleSuccess(res.data.data, res.data.data.id)))
    .catch(error => dispatch(createArticleFailure(error)))
}