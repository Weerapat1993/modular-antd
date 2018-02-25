import React, { Component } from 'react';
import { func, object, shape, arrayOf, objectOf, any } from 'prop-types';
import Markdown from 'react-remarkable'
import { Loading } from '../../../components'
import { withArticleByID, selectArticleWithKey } from '../redux';

class ArticleDetail extends Component {
  static propTypes = {
    fetchArticleDetail: func.isRequired,
    match: shape({
      params: object,
    }).isRequired,
    byID: arrayOf(any).isRequired,
    keys: objectOf(any).isRequired,
  }
  componentDidMount() {
    const { byID, match } = this.props
    const { id } = match.params
    const dataFirst = byID.filter(item => item === +id)
    if(!dataFirst.length) {
      this.props.fetchArticleDetail(id)
    }
  }
  
  render() {
    const { keys, match } = this.props
    const { id } = match.params
    const article = selectArticleWithKey(keys, id)
    return (
      <div>
        <Loading 
          isLoading={article.isFetching}
          error={article.error}
          onReload={() => this.props.fetchArticleDetail(id)} 
        >
          {
            article.data && (
              <article className="markdown-body">
                <Markdown source={`## ${article.data.title}`} />
                <Markdown source={article.data.description} />
              </article>
            )
          }
        </Loading>
      </div>
    );
  }
}

export default withArticleByID(ArticleDetail)
