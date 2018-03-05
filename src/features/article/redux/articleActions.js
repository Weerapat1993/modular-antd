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

export const formCreateArticleRequest = (key) => ({ type: ARTICLE.CREATE.REQUEST, key }) 
export const formCreateArticleSuccess = (data, key) => ({ type: ARTICLE.CREATE.SUCCESS, data, key }) 
export const formCreateArticleFailure = (error, key) => ({ type: ARTICLE.CREATE.FAILURE, error, key }) 
export const formCreateArticle = (data) => (dispatch) => {
  dispatch(formCreateArticleRequest())
  return axios({
    method: 'POST',
    responseType: 'json',
    url: API_ENDPOINT_ARTICLE_LIST(),
    data,
  })
    .then(res => dispatch(formCreateArticleSuccess(res.data.data, res.data.data.id)))
    .catch(error => dispatch(formCreateArticleFailure(error)))
}

export const formUpdateArticleRequest = (key) => ({ type: ARTICLE.UPDATE.REQUEST, key }) 
export const formUpdateArticleSuccess = (data, key) => ({ type: ARTICLE.UPDATE.SUCCESS, data, key }) 
export const formUpdateArticleFailure = (error, key) => ({ type: ARTICLE.UPDATE.FAILURE, error, key }) 
export const formUpdateArticle = (data) => (dispatch) => {
  dispatch(formUpdateArticleRequest())
  return axios({
    method: 'PUT',
    responseType: 'json',
    url: API_ENDPOINT_ARTICLE_LIST(),
    data,
  })
    .then(res => dispatch(formUpdateArticleSuccess(res.data.data, data.id)))
    .catch(error => dispatch(formUpdateArticleFailure(error)))
}


export const deleteArticleByIDRequest = (key) => ({ type: ARTICLE.DELETE.REQUEST, key }) 
export const deleteArticleByIDSuccess = (data, key) => ({ type: ARTICLE.DELETE.SUCCESS, data, key }) 
export const deleteArticleByIDFailure = (error, key) => ({ type: ARTICLE.DELETE.FAILURE, error, key }) 
export const deleteArticleByID = (data, key) => (dispatch) => {
  dispatch(deleteArticleByIDRequest(key))
  return axios({
    method: 'DELETE',
    responseType: 'json',
    url: API_ENDPOINT_ARTICLE_LIST(),
    data,
  })
    .then(res => dispatch(deleteArticleByIDSuccess(res.data.data, key)))
    .catch(error => dispatch(deleteArticleByIDFailure(error, key)))
}