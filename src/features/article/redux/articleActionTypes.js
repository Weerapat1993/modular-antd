// import { asyncActionType } from '../../../utils'

export const asyncActionType = (type) => ({
  REQUEST: type+'_REQUEST',
  SUCCESS: type+'_SUCCESS',
  FAILURE: type+'_FAILURE',
})

export const FETCH_ARTICLE_LIST = asyncActionType('FETCH_ARTICLE_LIST')