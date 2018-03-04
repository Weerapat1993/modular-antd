import React, { Component } from 'react'
import { func, object, objectOf } from 'prop-types'
import { List, Avatar, Icon } from 'antd'
import moment from 'moment'
import { withProduct, selectProductWithKey } from '../redux'
import { LinkConfirm, Loading } from '../../../components'

const GITHUB_NAME = 'Weerapat1993'

const colorLanguage = (lang) => {
  switch(lang) {
    case 'JavaScript':
      return '#ffcf02'
    case 'PHP':
      return '#4e5c95'
    case 'Shell':
      return '#88e050'
    default:
      return '#999'
  }
}

const IconText = ({ type, text, color, iconRight }) => {
  const styleDefault = iconRight ? { marginLeft: 8 } : { marginRight: 8 } 
  const iconStyles = color ? { color, ...styleDefault } : styleDefault
  if(iconRight) {
    return (
      <span>
        {text}
        <Icon type={type} style={iconStyles} />
      </span>
    )
  }
  return (
    <span>
      <Icon type={type} style={iconStyles} />
      {text}
    </span>
  )
}

class ProfilePage extends Component {
  static propTypes = {
    fetchProductList: func.isRequired,
    keys: objectOf(object),
    // byID: arrayOf(string).isRequired,
  }

  static defaultProps = {
    keys: {}
  }

  constructor() {
    super()

    this.state = {
      githubUser: GITHUB_NAME,
    }

    this.handleGithubProfile = this.handleGithubProfile.bind(this)
  }
  componentDidMount() {
    this.reloadData()
  }

  githubProfile(select) {
    const url = `https://github.com/${select}`
    this.confirmUrl(url)
  }

  confirmUrl = (url) => {
    const title = 'Do you Want to open github profile?'
    LinkConfirm(title, url)
  }

  reloadData() {
    const { githubUser } = this.state
    const { keys } = this.props
    const profile = selectProductWithKey(githubUser, keys)
    if (profile.isReload) {
      this.props.fetchProductList(githubUser)
    }
  }

  handleGithubProfile(e) {
    const name = e.target.value
    this.setState({ githubUser: name }, () => {
      this.reloadData()
    })
  }

  render() {
    const { githubUser } = this.state
    const { fetchProductList, keys } = this.props
    const profile = selectProductWithKey(githubUser, keys)
    // const btnGroups = [GITHUB_NAME, 'NotFoundData', 'facebook']
    return (
      <div>
        <h1>Github Profile</h1>
        {/*
        <Button.Group>
          {
            byID.map((item) => (
              <Button type='primary' onClick={() => this.githubProfile(item)} key={item}>{item}</Button>
            ))
          }
        </Button.Group>
        <Radio.Group onChange={this.handleGithubProfile} defaultValue={githubUser}>
          {
            btnGroups.map((item) => (
              <Radio.Button key={item} value={item} >{item}</Radio.Button>
            ))
          }
        </Radio.Group>
        */}
        <Loading
          isLoading={profile.isFetching}
          error={profile.error}
          onReload={() => fetchProductList(githubUser)}
        >
          <List
            itemLayout="horizontal"
            size="large"
            dataSource={profile.data}
            renderItem={item => (
              <List.Item 
                key={item.title}
                actions={[
                  <IconText key='star' type="star" text={item.stargazers_count} color='#ffcf02' />, 
                  <IconText key='eye' type="eye" text={item.watchers_count} />, 
                  <IconText key='message' type="message" text={item.open_issues} />
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.owner.avatar_url} />}
                  title={<a onClick={() => this.confirmUrl(item.html_url)} target='_blank'>{item.name}</a>}
                  description={moment(item.pushed_at).fromNow()}
                />
                <div>
                  <IconText 
                    type="check-circle" 
                    text={item.language || 'None'} 
                    color={colorLanguage(item.language)} 
                    iconRight
                  />
                </div>
              </List.Item>
            )}
          />
        </Loading>
      </div>
    )
  }
}

export default withProduct(ProfilePage)
