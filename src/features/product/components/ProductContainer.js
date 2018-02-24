import React, { Component } from 'react'
import { func, arrayOf, string, object, objectOf } from 'prop-types'
import _ from 'lodash'
import { Radio, Button, List, Avatar } from 'antd'
import moment from 'moment'
import { withProduct } from '../redux'  
import { LinkConfirm, Loading } from '../../../components'

const GITHUB_NAME = 'Weerapat1993'

class ProfilePage extends Component {
  static propTypes = {
    fetchProductList: func.isRequired,
    handleGithubProfile: func.isRequired,
    keys: objectOf(object),
    byID: arrayOf(string).isRequired,
  }

  static defaultProps = {
    keys: {}
  }

  constructor() {
    super()

    this.state = {
      githubUser: 'Weerapat1993',
    }

    this.handleGithubProfile = this.handleGithubProfile.bind(this)
  }
  componentDidMount() {
    this.reloadData()
  }

  getProfile() {
    const { githubUser } = this.state
    const { keys } = this.props
    const defaultState = {
      isFetching: false,
      isReload: true,
      data: [],
      error: '',
    }
    const profile = _.get(keys, githubUser) || defaultState
    return profile
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
    const profile = this.getProfile()
    if(profile.isReload) {
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
    const { byID } = this.props
    const profile = this.getProfile()
    const btnGroups = [GITHUB_NAME, 'NotFoundData', 'facebook']
    const Link = ({ item }) => <a onClick={() => this.confirmUrl(item.html_url)} target='_blank'>{item.full_name}</a>
    return (
      <div>
        <h1>Github Profile</h1>
        <Radio.Group onChange={this.handleGithubProfile} defaultValue={githubUser}>
          {
            btnGroups.map((item) => (
              <Radio.Button key={item} value={item} >{item}</Radio.Button>
            ))
          }
        </Radio.Group>
        <h5>History</h5>
        <Button.Group>
          {
            byID.map((item) => (
              <Button type='primary' onClick={() => this.githubProfile(item)} key={item}>{item}</Button>
            ))
          }
        </Button.Group>
        <Loading 
          isLoading={profile.isFetching}
          error={profile.error}
          onReload={() => this.props.handleGithubProfile(githubUser)}
        >
          <List
            itemLayout="horizontal"
            dataSource={profile.data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.owner.avatar_url} />}
                  title={<Link item={item} />}
                  description={item.description}
                />
                <div>{moment(item.updated_at, "YYYYMMDD").fromNow()}</div>
              </List.Item>
            )}
          />
        </Loading>
      </div>
    )
  }
}

export default withProduct(ProfilePage)
