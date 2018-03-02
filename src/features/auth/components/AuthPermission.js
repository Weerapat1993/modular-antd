import React from 'react'
import { func, shape, bool } from 'prop-types'
import { Button, Icon } from 'antd'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { config } from '../../../config/env'
import styles from './styles'

const AuthPermission = ({ auth, authLogin }) => {
  const responseFacebook = ({ email, name, picture }) => {
    const data = {
      email,
      name,
      avatar: picture.data.url
    }
    authLogin(data)
  }
  return (
    <div style={styles.container}>
      <Icon type="lock" style={styles.loginIcon} />
      <div style={styles.loginHeader}>
        User Permission!
      </div> 
      <div style={styles.errorText}>
        <div>Permission is denined</div>
        <div>Please login.</div>
      </div>
      <FacebookLogin
        appId={config.REACT_APP_FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={responseFacebook} 
        render={({ onClick }) => (
          <Button 
            loading={auth.isFetching}
            size='large'
            icon='facebook' 
            type='primary' 
            onClick={onClick}
          >
            Login with Facebook
          </Button>
        )}
      />
    </div>
  )
}

AuthPermission.propTypes = {
  auth: shape({ isFetching: bool }).isRequired,
  authLogin: func.isRequired,
}

export default AuthPermission