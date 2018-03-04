import React, { Component } from 'react'
import { func, object, objectOf } from 'prop-types'
import { List, Avatar } from 'antd'
import moment from 'moment'
import { withProduct, selectProductWithKey } from '../redux'
import { LinkConfirm, Loading } from '../../../components'

const GITHUB_NAME = 'Weerapat1993'
// const { Meta } = Card

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
    const Linker = ({ item }) => <a onClick={() => this.confirmUrl(item.html_url)} target='_blank'>{item.full_name}</a>
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
          {/* <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }}
            dataSource={profile.data}
            renderItem={item => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 180, height: 280 }}
                  onClick={() => this.confirmUrl(item.html_url)}
                  cover={<img alt="example" src={item.owner.avatar_url} />}
                >
                  <Meta
                    title={item.name}
                    description={moment(item.updated_at, "YYYYMMDD").fromNow()}
                  />
                </Card>
              </List.Item>
            )}
          /> */}
          <List
            itemLayout="horizontal"
            dataSource={profile.data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.owner.avatar_url} />}
                  title={<Linker item={item} />}
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
