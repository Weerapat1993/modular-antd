import React from 'react';
import { ArticleForm } from '../../features'

const ArticleCreate = (props) => (
  <ArticleForm {...props} method='POST' />
)

export default ArticleCreate;
