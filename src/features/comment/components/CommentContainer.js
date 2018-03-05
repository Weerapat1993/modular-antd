import React, { Component } from 'react'
import { withSizes } from 'react-sizes'
import moment from 'moment'
import { arrayOf, object, shape, bool, number, func } from 'prop-types'
import { List, Avatar, Button } from 'antd'
import styles from './styles'
import { withComment, selectCommentListWithKey } from '../redux';
import CommentForm from './CommentForm'
import { Loading } from '../../../components'

class CommentList extends Component {
  static propTypes = {
    comment: shape({
      data: arrayOf(object),
    }).isRequired,
    auth: shape({
      user: object,
      isFetching: bool,
    }).isRequired,
    articleID: number.isRequired,
    fetchCommentList: func.isRequired,
    isMobile: bool.isRequired,
    deleteCommentByID: func.isRequired,
  }

  componentDidMount() {
    const { articleID, comment } = this.props
    const commentWithArticle = selectCommentListWithKey(comment.keys, articleID)
    if(commentWithArticle.isReload) {
      this.props.fetchCommentList(articleID)
    }
  }

  handleDelete(id) {
    const { articleID } = this.props
    const data = {
      id,
    }
    this.props.deleteCommentByID(data, articleID)
  }

  render() {
    const { comment, auth, articleID, fetchCommentList, isMobile } = this.props
    const userID = auth.user.id ? auth.user.id : 0
    const commentWithArticle = selectCommentListWithKey(comment.keys, articleID)
    return (
      <div>
        <h2>Comments</h2>
        <CommentForm articleID={articleID} isMobile={isMobile} />
        <Loading 
          isLoading={commentWithArticle.isFetching}
          error={commentWithArticle.error}
          onReload={() => fetchCommentList(articleID)}
        >
          <List
            itemLayout="horizontal"
            dataSource={commentWithArticle.data || []}
            renderItem={item => (
                <List.Item 
                  actions={userID === item.user_id ? [
                    <Button key='edit' type='dashed' icon='edit' shape='circle' />,
                    <Button key='delete' type='danger' icon='close' shape='circle' onClick={() => this.handleDelete(item.id)} />,
                  ] : [
                    <Button key='menu' type='dashed' icon='ellipsis' shape='circle' />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar style={styles.marginLeft(10)} src={item.avatar || ''} />}
                    title={item.user_name}
                    description={item.comment}
                  />
                  { !isMobile && <div>{moment(item.created_at).fromNow()}</div> }
                </List.Item>
              )
            }
          />
        </Loading>
      </div>
    )
  }
}

const mapSizesToProps = ({ width, height }) => ({
  isMobile: width < 480,
  isDesktop: width > 1024,
  dimenstion: {
    width, 
    height,
  }
})

export default withComment(withSizes(mapSizesToProps)(CommentList))
