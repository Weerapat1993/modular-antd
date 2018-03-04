import React from 'react';
import { ProductContainer } from '../../features'
import { SEO } from '../../components'

const GithubPage = (props) => (
  <div>
    <SEO 
      title='Github Profile Weerapat1933'
      description='Github Repositories by Weerapat1993'
    />
    <ProductContainer {...props} />
  </div>
)

export default GithubPage;
