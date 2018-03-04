import React from 'react';
import { ArticleContainer } from '../../features'
import { SEO } from '../../components'

const ArticlePage = (props) => (
  <div>
    <SEO 
      title='Article Lists'
      description='Article Lists'
    />
    <ArticleContainer {...props} />
  </div>
)

export default ArticlePage;
