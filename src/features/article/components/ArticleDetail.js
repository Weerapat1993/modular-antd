import React, { Component } from 'react';
import { withSizes } from 'react-sizes'
import { func, object, shape, arrayOf, objectOf, any, bool } from 'prop-types';
import Markdown from 'react-remarkable'
import { Button, Icon } from 'antd'
import { Loading, UserHeader } from '../../../components'
import { withArticleByID, selectArticleWithKey } from '../redux';

class ArticleDetail extends Component {
  static propTypes = {
    fetchArticleDetail: func.isRequired,
    match: shape({ params: object }).isRequired,
    byID: arrayOf(any).isRequired,
    keys: objectOf(any).isRequired,
    isMobile: bool.isRequired,
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
    const { keys, match, isMobile } = this.props
    const { id } = match.params
    const article = selectArticleWithKey(keys, id)
    return (
      <div>
        <UserHeader>
          <Button.Group size='large'>
            <Button type='dashed primary'><Icon type='edit' />{!isMobile && 'Edit'}</Button>
            <Button type='danger'>{!isMobile && 'Delete'}<Icon type='delete' /></Button>
          </Button.Group>
        </UserHeader>
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

const mapSizeToProps = ({ width }) => ({
  isMobile: width < 480
})

export default withArticleByID(withSizes(mapSizeToProps)(ArticleDetail))
