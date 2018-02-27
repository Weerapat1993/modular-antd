import React from 'react'
import { func, element, node, oneOfType, shape, string, bool, object } from 'prop-types'
import moment from 'moment'
import { List, Avatar } from 'antd'
import { withAuth } from '../../features';

const UserHeader = ({ children, auth }) => (
  <List
    itemLayout="horizontal"
    dataSource={[auth.user]}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={item.name}
          description={moment(item.updated_at, "YYYYMMDD").fromNow()}
        />
        {children}
      </List.Item>
    )}
  />
)

UserHeader.propTypes = {
  children: oneOfType([
    func,
    element,
    node,
  ]).isRequired,
  auth: shape({
    user: object,
    isAuth: bool,
    token: string,
  }).isRequired,
}

export default withAuth(UserHeader)
