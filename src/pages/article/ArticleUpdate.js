import React from 'react';
import { shape, object } from 'prop-types'
import { ArticleForm } from '../../features'
import { ErrorPage } from '../../components'

const ArticleUpdate = (props) => (
  (props.location.state) ? (
    <ArticleForm
      {...props}
      dataForm={props.location.state.dataForm}
      method='PUT'
    />
  ) : (
    <ErrorPage {...props} />
  )
)


ArticleUpdate.propTypes = {
  location: shape({
    state: object,
  }).isRequired,
}

export default ArticleUpdate;
