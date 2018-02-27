import React from 'react'
import { func, shape, bool, object, string } from 'prop-types'
import FacebookLogin from 'react-facebook-login'
import { withAuthLogin } from '../redux';

const AuthFacebook = ({ authLogin, auth }) => {
  const responseFacebook = ({ email, name, picture }) => {
    const data = {
      email,
      name,
      avatar: picture.data.url
    }
    authLogin(data)
  }
  if(auth.isAuth) {
    return null
  }
  return (
    <FacebookLogin
      appId="1028852790492705"
      autoLoad
      fields="name,email,picture"
      callback={responseFacebook} 
    />
  )
}

AuthFacebook.propTypes = {
  authLogin: func.isRequired,
  auth: shape({
    user: object,
    isAuth: bool,
    token: string,
  }).isRequired,
}

export default withAuthLogin(AuthFacebook)
