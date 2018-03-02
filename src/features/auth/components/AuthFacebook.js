import React, { Component } from 'react'
import { func, shape, bool, object, string } from 'prop-types'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button, Avatar, Affix, Popover } from 'antd'
import { withAuthLogin } from '../redux';
import { config } from '../../../config/env'

class AuthFacebook extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }

    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  handleLogout() {
    this.hide()
    setTimeout(() => {
      this.props.authLogout()
    }, 500)
  }

  renderHasAuth() {
    const { auth } = this.props
    return (
      <Popover
        content={<a onClick={this.handleLogout}>Logout</a>}
        title={auth.user.name}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomRight"
      >
        <Avatar src={auth.user.avatar} />
      </Popover>
    )
  }

  renderNotAuth() {
    const { authLogin, auth, isMobile } = this.props
    const responseFacebook = ({ email, name, picture }) => {
      const data = {
        email,
        name,
        avatar: picture.data.url
      }
      authLogin(data)
    }
    return (
      <FacebookLogin
        appId={config.REACT_APP_FACEBOOK_APP_ID}
        fields="name,email,picture"
        isMobile={isMobile}
        callback={responseFacebook} 
        render={renderProps => (
          <Button 
            loading={auth.isFetching}
            shape='circle' 
            icon='facebook' 
            type='primary'
            onClick={renderProps.onClick} 
          />
        )}
      />
    )
  }

  render() {
    const { auth, isMobile } = this.props
    const styleMobile = { position: 'absolute', top: 10, right: 10 }
    if(isMobile) {
      if(auth.isAuth) {
        return (
          <Affix offsetTop={isMobile ? 10 : 72} style={isMobile ? styleMobile : {}} >
            {this.renderHasAuth()}
          </Affix>
        )
      }
      return (
        <Affix offsetTop={isMobile ? 10 : 72} style={isMobile ? styleMobile : {}} >
          {this.renderNotAuth()}
        </Affix>
      )
    }
    return auth.isAuth ? this.renderHasAuth() : this.renderNotAuth() 
  }
}

AuthFacebook.propTypes = {
  authLogin: func.isRequired,
  authLogout: func.isRequired,
  auth: shape({
    isFetching: bool,
    user: object,
    isAuth: bool,
    token: string,
  }).isRequired,
  isMobile: bool,
}

AuthFacebook.defaultProps = {
  isMobile: false,
}

export default withAuthLogin(AuthFacebook)
