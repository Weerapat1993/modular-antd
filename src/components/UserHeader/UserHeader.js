import React from 'react'
import { func, element, node, oneOfType, shape, string } from 'prop-types'
import moment from 'moment'
import { List, Avatar, Affix } from 'antd'

const UserHeader = ({ children, user }) => (
  <Affix>
    <List
      itemLayout="horizontal"
      dataSource={[user]}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.user_name || item.name}
            description={moment(item.updated_at).fromNow()}
          />
          {children}
        </List.Item>
      )}
    />
  </Affix>
)

UserHeader.propTypes = {
  children: oneOfType([
    func,
    element,
    node,
  ]).isRequired,
  user: shape({
    avatar: string,
    user_name: string,
  }),
}

UserHeader.defaultProps = {
  user: {
    avatar: '',
    user_name: 'No Name',
    updated_at: 0,
  }
}

export default UserHeader
