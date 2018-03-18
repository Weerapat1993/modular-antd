import React from 'react';
import { ProductContainer } from '../../features'
import { SEO } from '../../components'
import { config } from  '../../config/env'

const GithubPage = (props) => (
  <div>
    <SEO 
      title={`Github Profile ${config.REACT_APP_GITHUB_PROFILE}`}
      description={`Github Repositories by ${config.REACT_APP_GITHUB_PROFILE}`}
    />
    <ProductContainer {...props} />
  </div>
)

export default GithubPage;
