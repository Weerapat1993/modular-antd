import React from 'react';
import { shape, object } from 'prop-types'
import { ArticleForm } from '../../features'

const ArticleUpdate = (props) => (
  <ArticleForm
    {...props}
    dataForm={props.location.state.dataForm}
    method='PUT'
  />
)


ArticleUpdate.propTypes = {
  location: shape({
    state: object,
  }).isRequired,
}

export default ArticleUpdate;
