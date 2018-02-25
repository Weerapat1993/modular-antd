import axios from 'axios'
import { ARTICLE } from './articleActionTypes'
import { API_ENDPOINT_ARTICLE_LIST, API_ENDPOINT_ARTICLE_DETAIL } from './articleEndpoints'

export const fetchArticleListRequest = () => ({ type: ARTICLE.LIST.REQUEST }) 
export const fetchArticleListSuccess = (data) => ({ type: ARTICLE.LIST.SUCCESS, data }) 
export const fetchArticleListFailure = (error) => ({ type: ARTICLE.LIST.FAILURE, error }) 
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


export const fetchArticleDetailRequest = (key) => ({ type: ARTICLE.DETAIL.REQUEST, key }) 
export const fetchArticleDetailSuccess = (data, key) => ({ type: ARTICLE.DETAIL.SUCCESS, data, key }) 
export const fetchArticleDetailFailure = (error, key) => ({ type: ARTICLE.DETAIL.FAILURE, error, key }) 
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

export const createArticleRequest = (key) => ({ type: ARTICLE.CREATE.REQUEST, key }) 
export const createArticleSuccess = (data, key) => ({ type: ARTICLE.CREATE.SUCCESS, data, key }) 
export const createArticleFailure = (error, key) => ({ type: ARTICLE.CREATE.FAILURE, error, key }) 
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


export const deleteArticleByIDRequest = (key) => ({ type: ARTICLE.DELETE.REQUEST, key }) 
export const deleteArticleByIDSuccess = (data, key) => ({ type: ARTICLE.DELETE.SUCCESS, data, key }) 
export const deleteArticleByIDFailure = (error, key) => ({ type: ARTICLE.DELETE.FAILURE, error, key }) 
export const deleteArticleByID = (data) => (dispatch) => {
  dispatch(deleteArticleByIDRequest())
  return axios({
    method: 'POST',
    responseType: 'json',
    url: API_ENDPOINT_ARTICLE_LIST(),
    data,
  })
    .then(res => dispatch(deleteArticleByIDSuccess(res.data.data, res.data.data.id)))
    .catch(error => dispatch(deleteArticleByIDFailure(error)))
}