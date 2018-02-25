import React from 'react'
import moment from 'moment'
import { List, Avatar } from 'antd'

const userExample = [
  {
    name: 'Weerapat1993',
    avatar: '',
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  }
]

const UserHeader = ({ children }) => (
  <List
    itemLayout="horizontal"
    dataSource={userExample}
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

export default UserHeader
