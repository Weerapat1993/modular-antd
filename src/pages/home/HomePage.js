import React from 'react';
import { ProductContainer } from '../../features'
import { App } from '../../components'

const HomePage = (props) => (
  <App {...props}>
    <ProductContainer {...props} />
  </App>
)

export default HomePage;
