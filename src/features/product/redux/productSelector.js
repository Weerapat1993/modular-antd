import _ from 'lodash'

export const selectProductWithKey = (key, data) => {
  const defaultState = {
    isFetching: false,
    isReload: true,
    data: [],
    error: '',
  }
  const profile = _.get(data, key, defaultState)
  return profile
}