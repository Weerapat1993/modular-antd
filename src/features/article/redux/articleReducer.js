import { FullStackReducer } from '../../../utils'
import { FETCH_ARTICLE_LIST, FETCH_ARTICLE_DEATIL, CREATE_ARTICLE } from './articleActionTypes'
import { setNormalize } from './articleUtils'

export const initialState = {
  isFetching: false,
  isReload: true,
  data: [],
  error: '',
  keys: {},
  byID: [], 
}

/**
 * Article Reducer
 * @type {initialState} 
 */
export const articleReducer = (state = initialState, action) => {
  const reducer = new FullStackReducer(state, action)
  const { type, data } = action
  switch(type) {
    case FETCH_ARTICLE_LIST.REQUEST:
      return reducer.getRequest()
    case FETCH_ARTICLE_LIST.SUCCESS:
      return reducer.getSuccess({
        keys: setNormalize(data, 'id'),
        byID: data.map(item => item.id),
      })
    case FETCH_ARTICLE_LIST.FAILURE:
      return reducer.getFailure()
    case FETCH_ARTICLE_DEATIL.REQUEST:
      return reducer.getRequestWithKey()
    case FETCH_ARTICLE_DEATIL.SUCCESS:
      return reducer.getSuccessWithKey({ data })
    case FETCH_ARTICLE_DEATIL.FAILURE:
      return reducer.getFailureWithKey()
    case CREATE_ARTICLE.REQUEST:
      return state
    case CREATE_ARTICLE.SUCCESS:
      return reducer.getSuccessWithKey({ data })
    case CREATE_ARTICLE.FAILURE:
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
