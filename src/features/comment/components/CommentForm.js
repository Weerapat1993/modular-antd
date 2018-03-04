import React, { Component } from 'react'
import { func, bool, number } from 'prop-types'
import { List, Avatar, Input, Button, Icon } from 'antd'
import { withSizes } from 'react-sizes'
import styles from './styles'
import { AuthCheck } from '../../auth';
import { withComment } from '../redux';

class CommentForm extends Component {
  static propTypes = {
    postComment: func.isRequired,
    articleID: number.isRequired,
    isMobile: bool.isRequired,
  }

  constructor() {
    super()

    this.state = {
      comment: '',
    }

    this.handleSumbit = this.handleSumbit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  emitEmpty() {
    this.commentInput.focus();
    this.setState({ comment: '' });
  }

  handleSumbit(e) {
    e.preventDefault()
    const { auth, articleID } = this.props
    const { comment } = this.state

    const dataForm = {
      comment,
      user_id: auth.user.id,
      article_id: articleID
    }
    this.emitEmpty()
    this.props.postComment(dataForm)
  }

  handleChange(e) {
    this.setState({ comment: e.target.value })
  }

  render() {
    const { auth, isMobile } = this.props
    return (
      <AuthCheck>
        <List
          style={styles.backgroundColor('#EEE')}
          itemLayout="horizontal"
          dataSource={[{}]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={styles.marginLeft(10)} src={auth.user.avatar || ''} />}
                // title={auth.user.name}
                description={
                  <Input.Group compact>
                    <Input 
                      style={styles.maxWidth(isMobile ? 200 : 360)}
                      prefix={<Icon type="message" style={styles.color('rgba(0,0,0,.25)')} />}
                      placeholder="แสดงความคิดเห็นเกี่ยวกับสิ่งนี้ ..."
                      onChange={this.handleChange}
                      ref={node => this.commentInput = node}
                    />
                    <Button 
                      type="primary" 
                      icon='edit'
                      onClick={this.handleSumbit}
                    />
                  </Input.Group>
                }
              />
            </List.Item>
          )}
        />
      </AuthCheck>
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

export default withComment(withSizes(mapSizesToProps)(CommentForm))
