import React from 'react'
import withSizes from 'react-sizes'
import AppDesktop from './AppDesktop'
import AppMobie from './AppMobile'

const AppContainer = (props) => (
  props.isDesktop ? 
    <AppDesktop {...props} />
  : 
    <AppMobie {...props} />
)

const mapSizesToProps = ({ width, height }) => ({
  isMobile: width < 480,
  isDesktop: width > 1024,
  dimenstion: {
    width, 
    height,
  }
})

const App = withSizes(mapSizesToProps)(AppContainer)

export { App }
