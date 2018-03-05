import { NormalizeReducer, classReducer } from '../../../utils'
import { FETCH_COMMENT_LIST, CREATE_COMMENT, DELETE_COMMENT } from './commentActionTypes'

// InititalState
const initialState = {
  keys: {},
  byID: [],
}

class CommentReducer extends NormalizeReducer {
  getState() {
    const { type, data } = this.action
    switch (type) {
      case FETCH_COMMENT_LIST.REQUEST:
        return this.getRequestWithKey()
      case FETCH_COMMENT_LIST.SUCCESS:
        return this.getSuccessWithKey({ data: data.reverse() })
      case FETCH_COMMENT_LIST.FAILURE:
        return this.getFailureWithKey()
      case CREATE_COMMENT.REQUEST:
        return this.state
      case CREATE_COMMENT.SUCCESS:
        return this.setStateWithKey({ 
          data: [ data, ...this.getStateWithKey().data ]
        })
      case CREATE_COMMENT.FAILURE:
        return this.state
      case DELETE_COMMENT.REQUEST:
        return this.state
      case DELETE_COMMENT.SUCCESS:
        return this.setStateWithKey({ data: this.getStateWithKey().data.filter(item => item.id !== data.id) })
      case DELETE_COMMENT.FAILURE:
        return this.state
      default:
        return this.state
    }
  }
}

/** @type {initialState} */
export const commentReducer = classReducer(CommentReducer, initialState)

/**
 * Comment Model
 * @param {Object} state
 * @return {initialState}
 */
export const Comment = (state) => state.comment
