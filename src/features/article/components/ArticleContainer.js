import React, { Component } from 'react';
import { func, shape, string, bool, arrayOf, object, oneOfType } from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { List, Avatar, Button } from 'antd'
import { withArticle } from '../redux';
import { Loading } from '../../../components';

class ArticleController extends Component {
  static propTypes = {
    article: shape({
      isFetching: bool.isRequired,
      isReload: bool.isRequired,
      data: arrayOf(object),
      error: oneOfType([
        bool,
        string,
      ])
    }).isRequired,
    fetchArticleList: func.isRequired,
  }

  componentDidMount() {
    this.props.fetchArticleList()
  }

  render() {
    const { article, fetchArticleList } = this.props
    return (
      <div>
        <Link to='/article/create'>
          <Button type='primary'>Create Article</Button>
        </Link>
        <Loading
          isLoading={article.isFetching}
          error={article.error}
          onReload={() => fetchArticleList()}
        >
          <List
            itemLayout="horizontal"
            dataSource={article.data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={''} />}
                  title={item.title}
                  description={item.description}
                />
                <div>{moment(item.updated_at, "YYYYMMDD").fromNow()}</div>
              </List.Item>
            )}
          />
        </Loading>
      </div>
    );
  }
}

export default withArticle(ArticleController)
