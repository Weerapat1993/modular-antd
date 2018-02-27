import { AUTH_LOGIN } from './authActionTypes'

// InititalState
const initialState = {
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
  const { data, type } = action
  switch (type) {
    case AUTH_LOGIN.REQUEST:
      return state
    case AUTH_LOGIN.SUCCESS:
      return { 
        ...state,
        token: data.token,
        isAuth: true,
        user: data.user,
      }
    case AUTH_LOGIN.FAILURE:
      return state
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
