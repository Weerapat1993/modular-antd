import axios from 'axios'
import { FETCH_COMMENT_LIST, CREATE_COMMENT, DELETE_COMMENT } from './commentActionTypes'
import { API_ENDPOINT_COMMENT_LIST, API_ENDPOINT_POST_COMMENT, API_ENDPOINT_DELETE_COMMENT } from './commentEndpoints'

export const fetchCommentListRequest = (key) => ({ type: FETCH_COMMENT_LIST.REQUEST, key }) 
export const fetchCommentListSuccess = (data, key) => ({ type: FETCH_COMMENT_LIST.SUCCESS, data, key }) 
export const fetchCommentListFailure = (error, key) => ({ type: FETCH_COMMENT_LIST.FAILURE, error, key }) 
export const fetchCommentList = (articleID) => (dispatch) => {
  dispatch(fetchCommentListRequest(articleID))
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_COMMENT_LIST(articleID),
  })
    .then(res => dispatch(fetchCommentListSuccess(res.data.data, articleID)))
    .catch(error => dispatch(fetchCommentListFailure(error, articleID)))
}


export const postCommentRequest = (key) => ({ type: CREATE_COMMENT.REQUEST, key }) 
export const postCommentSuccess = (data, key) => ({ type: CREATE_COMMENT.SUCCESS, data, key }) 
export const postCommentFailure = (error, key) => ({ type: CREATE_COMMENT.FAILURE, error, key }) 
export const postComment = (data) => (dispatch) => {
  dispatch(postCommentRequest(data.article_id))
  return axios({
    method: 'POST',
    responseType: 'json',
    url: API_ENDPOINT_POST_COMMENT(),
    data,
  })
    .then(res => dispatch(postCommentSuccess(res.data.data, data.article_id)))
    .catch(error => dispatch(postCommentFailure(error, data.article_id)))
}

export const deleteCommentByIDRequest = (key) => ({ type: DELETE_COMMENT.REQUEST, key }) 
export const deleteCommentByIDSuccess = (data, key) => ({ type: DELETE_COMMENT.SUCCESS, data, key }) 
export const deleteCommentByIDFailure = (error, key) => ({ type: DELETE_COMMENT.FAILURE, error, key }) 
export const deleteCommentByID = (data, key) => (dispatch) => {
  dispatch(deleteCommentByIDRequest(key))
  return axios({
    method: 'DELETE',
    responseType: 'json',
    url: API_ENDPOINT_DELETE_COMMENT(),
    data,
  })
    .then(res => dispatch(deleteCommentByIDSuccess(res.data.data, key)))
    .catch(error => dispatch(deleteCommentByIDFailure(error, key)))
}
