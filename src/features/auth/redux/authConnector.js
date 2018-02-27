import { connect } from 'react-redux'
import { authLogin } from './authActions'

export const withAuthLogin = connect(({ auth }) => ({ auth }),{ authLogin })
export const withAuth = connect(({ auth }) => ({ auth }))
