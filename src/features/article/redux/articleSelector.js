import _ from 'lodash'

const defaultState = {
  isFetching: false,
  isReload: true,
  data: {
    id: '',
    title: '',
    descrition: '',
  },
  error: '',
}

/**
 * Select Article With Key
 * @param {Object} state 
 * @param {string} key
 * @return {defaultState} 
 */
export const selectArticleWithKey = (state, key) => {
  const defaultStateInline = defaultState
  const article = _.get(state, key, defaultStateInline)
  return article
}