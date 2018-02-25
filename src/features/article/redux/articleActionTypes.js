import { asyncActionType, crudActionType } from '../../../utils'

export const FETCH_ARTICLE_LIST = asyncActionType('FETCH_ARTICLE_LIST')
export const FETCH_ARTICLE_DEATIL = asyncActionType('FETCH_ARTICLE_DETAIL')
export const CREATE_ARTICLE = asyncActionType('CREATE_ARTICLE')
export const DELETE_ARTICLE = asyncActionType('DELETE_ARTICLE')

// CRUD ActionTypes
export const ARTICLE = crudActionType('ARTICLE')
