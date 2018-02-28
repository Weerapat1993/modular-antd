import React, { Component } from 'react'
import { func, shape, bool, object, string } from 'prop-types'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button, Avatar, Affix, Popover } from 'antd'
import { withAuthLogin } from '../redux';

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

  render() {
    const { authLogin, auth, isMobile } = this.props
    const responseFacebook = ({ email, name, picture }) => {
      const data = {
        email,
        name,
        avatar: picture.data.url
      }
      authLogin(data)
    }
    const styleMobile = { position: 'absolute', top: 10, right: 10 }
    if(auth.isAuth) {
      return (
        <Affix offsetTop={isMobile ? 10 : 72} style={isMobile ? styleMobile : {}} >
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
        </Affix>
      )
    }
    return (
      <Affix offsetTop={isMobile ? 10 : 72} style={isMobile ? styleMobile : {}} >
        <FacebookLogin
          appId="1028852790492705"
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
      </Affix>
    )
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
