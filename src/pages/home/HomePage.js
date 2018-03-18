import React from 'react';
import { ArticleContainer } from '../../features'
import { SEO } from '../../components'
import { config } from  '../../config/env'

const HomePage = (props) => (
  <div>
    <SEO 
      title={`${config.REACT_APP_GITHUB_PROFILE} Github Profile`}
      description='Home Page'
    />
    <ArticleContainer {...props} />
  </div>
)

export default HomePage;
