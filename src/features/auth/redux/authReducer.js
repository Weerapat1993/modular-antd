import { AUTH_LOGIN, AUTH_LOGOUT } from './authActionTypes'

// InititalState
const initialState = {
  isFetching: false,
  token: null,
  isAuth: false,
  user: {},
}

/**
 * Auth Reducer
 * @param {initialState} state
 * @param {Object} action
 * @return {initialState}
 */
export const authReducer = (state = initialState, action) => {
  const { data, type, error } = action
  switch (type) {
    case AUTH_LOGIN.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: '',
      }
    case AUTH_LOGIN.SUCCESS:
      return { 
        isFetching: false,
        token: data.token,
        isAuth: true,
        user: data.user,
        error: '',
      }
    case AUTH_LOGIN.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: error.message,
      }
    case AUTH_LOGOUT:
      return initialState
    default:
      return state
  }
}

/**
 * Auth Model
 * @param {Object} state
 * @return {initialState}
 */
export const Auth = (state) => state.auth
