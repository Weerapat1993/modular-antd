import { FullStackReducer, classReducer } from '../../../utils'
import { ARTICLE } from './articleActionTypes'
import { setNormalize } from './articleUtils'

export const initialState = {
  isFetching: false,
  isReload: true,
  error: '',
  keys: {},
  byID: [], 
}

class ArticleReducer extends FullStackReducer {
  getState() {
    const { data, type } = this.action
    switch(type) {
      case ARTICLE.LIST.REQUEST:
        return this.getRequest()
      case ARTICLE.LIST.SUCCESS:
        return this.getSuccess({
          keys: setNormalize(data, 'id'),
          byID: data.map(item => item.id),
        })
      case ARTICLE.LIST.FAILURE:
        return this.getFailure()
      case ARTICLE.DETAIL.REQUEST:
        return this.getRequestWithKey()
      case ARTICLE.DETAIL.SUCCESS:
        return this.getSuccessWithKey({ data })
      case ARTICLE.DETAIL.FAILURE:
        return this.getFailureWithKey()
      case ARTICLE.CREATE.REQUEST:
        return this.state
      case ARTICLE.CREATE.SUCCESS:
        return this.getSuccessWithKey({ data })
      case ARTICLE.CREATE.FAILURE:
        return this.getFailure()
      case ARTICLE.UPDATE.REQUEST:
        return this.getRequestWithKey()
      case ARTICLE.UPDATE.SUCCESS:
        return this.getSuccessWithKey({ data })
      case ARTICLE.UPDATE.FAILURE:
        return this.getFailureWithKey()
      default:
        return this.state
    }
  }
}

/** @type {initialState} */
export const articleReducer = classReducer(ArticleReducer, initialState)

/**
 * Article Model
 * @param {Object} state
 * @return {initialState}
 */
export const Article = (state) => state.article
