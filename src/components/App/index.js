import React, { Component } from 'react'
import withSizes from 'react-sizes'
import AppDesktop from './AppDesktop'
import AppMobie from './AppMobile'
import { withAuthLogin } from '../../features/auth'

class AppContainer extends Component {
  componentWillMount() {
    if(localStorage.jwtToken) {
      const token = localStorage.jwtToken
      // setAuthorizationToken(localStorage.jwtToken)
      this.props.getAuthUserWithToken(token)
    }
  }

  render() {
    const { isDesktop } = this.props
    return (
      isDesktop ? 
        <AppDesktop {...this.props} />
      : 
        <AppMobie {...this.props} />
    )
  }
}

const mapSizesToProps = ({ width, height }) => ({
  isMobile: width < 480,
  isDesktop: width > 1024,
  dimenstion: {
    width, 
    height,
  }
})

const App = withAuthLogin(withSizes(mapSizesToProps)(AppContainer))

export { App }
