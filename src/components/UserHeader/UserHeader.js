import React from 'react'
import { func, element, node, oneOfType, shape, string } from 'prop-types'
import moment from 'moment'
import { withSizes } from 'react-sizes'
import { List, Avatar, Affix } from 'antd'

const UserHeader = ({ children, user, isMobile }) => (
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
        {
          isMobile ? (
            <Affix offsetTop={10} style={{ marginRight: 30 }} >
              {children}
            </Affix>
          ) : (
            children
          )
        }
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

const mapSizeToProps = ({ width }) => ({
  isMobile: width < 480
})

export default withSizes(mapSizeToProps)(UserHeader)
