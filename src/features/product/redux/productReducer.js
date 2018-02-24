import { FETCH_PRODUCT_LIST } from './productActionTypes'
import { NormalizeReducer } from '../../../utils'

export const initialState = {
  byID: [],
  keys: {},
}

/** @type {initialState} */
export const productReducer = (state = initialState, action) => {
  const reducer = new NormalizeReducer(state, action)
  switch(action.type) {
    case FETCH_PRODUCT_LIST.REQUEST:
      return reducer.getRequestWithKey()
    case FETCH_PRODUCT_LIST.SUCCESS:
      return reducer.getSuccessWithKey({ data: action.data })
    case FETCH_PRODUCT_LIST.FAILURE:
      return reducer.getFailureWithKey()
    default:
      return state
  }
}