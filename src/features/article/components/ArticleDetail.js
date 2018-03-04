import React, { Component } from 'react';
import { withSizes } from 'react-sizes'
import { func, object, shape, arrayOf, objectOf, any, bool, string } from 'prop-types';
import Markdown from 'react-remarkable'
import { Button, Icon } from 'antd'
import { Loading, UserHeader, SEO } from '../../../components'
import { withArticleByID, selectArticleWithKey } from '../redux';
import { AuthCheck } from '../../auth';

class ArticleDetail extends Component {
  static propTypes = {
    fetchArticleDetail: func.isRequired,
    match: shape({ params: object }).isRequired,
    location: shape({ pathname: string }).isRequired,
    history: shape({ push: func.isRequired }).isRequired,
    byID: arrayOf(any).isRequired,
    keys: objectOf(any).isRequired,
    isMobile: bool.isRequired,
  }

  constructor() {
    super()
    
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    const { byID, match } = this.props
    const { id } = match.params
    const dataFirst = byID.filter(item => item === +id)
    if(!dataFirst.length) {
      this.props.fetchArticleDetail(+id)
    }
  }

  handleEdit() {
    const { location, history, match, keys } = this.props
    const { id } = match.params
    const article = selectArticleWithKey(keys, id)
    const dataForm = article.data
    const route = {
      pathname: `${location.pathname}/edit`,
      state: { dataForm }
    }
    history.push(route)
  }
  
  render() {
    const { keys, match, location, isMobile } = this.props
    const { id } = match.params
    const article = selectArticleWithKey(keys, id)
    return (
      <div>
        { 
          article.data && (
            <SEO 
              title={article.data.title}
              path={location.pathname}
            /> 
          )
        }
        <UserHeader user={article.data}>
          {
            !article.isFetching && !article.error && (
              <AuthCheck>
                <Button.Group size='large'>
                  <Button type='dashed primary' onClick={this.handleEdit} ><Icon type='edit' />{!isMobile && 'Edit'}</Button>
                  <Button type='danger'>{!isMobile && 'Delete'}<Icon type='delete' /></Button>
                </Button.Group>
              </AuthCheck>
            )
          }
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
