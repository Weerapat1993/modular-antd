import React, { Component } from 'react';
import { func, shape, string, bool, arrayOf, object, oneOfType } from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { List, Avatar, Button, Icon, Card } from 'antd'
import { withArticle } from '../redux';
import { Loading } from '../../../components';
import styles from './styles'
import './styles.css'

const { Meta } = Card

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
    history: shape({
      push: func
    }).isRequired,
    fetchArticleList: func.isRequired,
  }

  componentDidMount() {
    const { article } = this.props
    if(article.isReload) {
      this.props.fetchArticleList()
    }
  }

  render() {
    const { article, fetchArticleList, history } = this.props
    return (
      <div>
        <div style={styles.textRight} >
          <h1 style={styles.headerText}><Icon type='book' /> Articles</h1>
          <Link to='/article/create'>
            <Button type='dashed primary' size='large' ><Icon type='plus' />New Story</Button>
          </Link>
        </div>
        <br />
        <Loading
          isLoading={article.isFetching}
          error={article.error}
          onReload={() => fetchArticleList()}
        >
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={article.byID}
            renderItem={key => {
              const item = article.keys[key].data 
              return (
                <List.Item>
                  <Card
                    hoverable
                    onClick={() => history.push(`/article/${key}`)}
                    cover={<img alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' className='bg-img-cover' />}
                  >
                    <Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.title}
                      description={moment(item.updated_at).fromNow()}
                    />
                  </Card>
                </List.Item>
              )
            }}
          />
        </Loading>
      </div>
    );
  }
}

export default withArticle(ArticleController)
