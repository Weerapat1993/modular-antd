import { Reducer } from '../../../utils'
import { FETCH_ARTICLE_LIST } from './articleActionTypes'

export const initialState = {
  isFetching: false,
  isReload: true,
  data: [],
  error: '',
}

/**
 * Article Reducer
 * @param {initialState} state 
 * @param {*} action
 * @return {initialState} 
 */
export const articleReducer = (state = initialState, action) => {
  const reducer = new Reducer(state, action)
  const { type, data } = action
  switch(type) {
    case FETCH_ARTICLE_LIST.REQUEST:
      return reducer.getRequest()
    case FETCH_ARTICLE_LIST.SUCCESS:
      return reducer.getSuccess({ data })
    case FETCH_ARTICLE_LIST.FAILURE:
      return reducer.getFailure()
    default:
      return state
  }
}

// class ArticleReducer extends Reducer {
//   getState() {
//     const { data, type } = this.action
//     switch(type) {
//       case FETCH_ARTICLE_LIST.REQUEST:
//         return this.getRequest()
//       case FETCH_ARTICLE_LIST.SUCCESS:
//         return this.getSuccess({ data })
//       case FETCH_ARTICLE_LIST.FAILURE:
//         return this.getFailure()
//       default:
//         return this.state
//     }
//   }
// }

// /** @type {initialState} */
// export const articleReducer = classReducer(ArticleReducer, initialState)
