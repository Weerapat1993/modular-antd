import React from 'react';
import { ArticleContainer } from '../../features'
import { SEO } from '../../components'

const HomePage = (props) => (
  <div>
    <SEO 
      title='Weerapat1993 Github Profile'
      description='Home Page'
    />
    <ArticleContainer {...props} />
  </div>
)

export default HomePage;
