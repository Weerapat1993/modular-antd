import React from 'react'
import { shape, bool } from 'prop-types'
import { connect } from 'react-redux'
import { authLogin, authLogout } from './authActions'
import { AuthPermission } from '../components'

export const withAuthLogin = connect(({ auth }) => ({ auth }),{ authLogin, authLogout })
export const withAuth = connect(({ auth }) => ({ auth }))
export const withPermission = (WrapperComponent) => {
  const HOC = props => (
    props.auth.isAuth ? (
      <WrapperComponent {...props} />
    ) : (
      <AuthPermission {...props} />
    )
  )
  HOC.propTypes = {
    auth: shape({
      isAuth: bool,
    }).isRequired,
  }
  return withAuthLogin(HOC)
}
