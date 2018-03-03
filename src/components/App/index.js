import React from 'react'
import { bool } from 'prop-types'
import withSizes from 'react-sizes'
import AppDesktop from './AppDesktop'
import AppMobie from './AppMobile'
import { withAuthWithToken } from '../../features/auth'

const AppContainer = (props) => (
  props.isDesktop ? 
    <AppDesktop {...props} />
  : 
    <AppMobie {...props} />
)

AppContainer.propTypes = {
  isDesktop: bool.isRequired,
}

const mapSizesToProps = ({ width, height }) => ({
  isMobile: width < 480,
  isDesktop: width > 1024,
  dimenstion: {
    width, 
    height,
  }
})

const App = withAuthWithToken(withSizes(mapSizesToProps)(AppContainer))

export { App }
