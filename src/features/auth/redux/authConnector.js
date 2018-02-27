import { connect } from 'react-redux'
import { authLogin, authLogout } from './authActions'

export const withAuthLogin = connect(({ auth }) => ({ auth }),{ authLogin, authLogout })
export const withAuth = connect(({ auth }) => ({ auth }))
