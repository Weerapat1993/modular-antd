import React, { Component } from 'react'
import { shape, bool, func, string } from 'prop-types'
import { connect } from 'react-redux'
import { authLogin, authLogout, getAuthUserWithToken } from './authActions'
import { AuthPermission } from '../components'

export const withAuthLogin = connect(({ auth }) => ({ auth }),{ authLogin, authLogout, getAuthUserWithToken })
export const withAuth = connect(({ auth }) => ({ auth }))
export const withAuthPermission = (WrapperComponent) => {
  const HOC = props => (
    props.auth.isAuth ? (
      <WrapperComponent {...props} />
    ) : (
      <AuthPermission {...props} />
    )
  )
  HOC.propTypes = {
    auth: shape({ isAuth: bool }).isRequired,
  }
  return withAuthLogin(HOC)
}

export const withAuthWithToken = (WrapperComponent) => {
  class HOC extends Component {
    static propTypes = {
      getAuthUserWithToken: func.isRequired,
      auth: shape({ isAuth: bool }).isRequired,
      history: shape({ push: func }).isRequired,
      location: shape({ pathname: string }).isRequired,
    }

    componentWillMount() {
      if(localStorage.jwtToken) {
        const token = localStorage.jwtToken
        // setAuthorizationToken(localStorage.jwtToken)
        this.props.getAuthUserWithToken(token)
      }
    }

    componentWillReceiveProps(nextProps) {
      const { auth, history, location } = this.props
      if(auth.isAuth !== nextProps.auth.isAuth && nextProps.auth.isAuth) {
        history.push(location.pathname)
      }
    }

    render() {
      return <WrapperComponent {...this.props} />
    }
  }
  return connect(({ auth }) => ({ auth }),{ getAuthUserWithToken })(HOC)
}