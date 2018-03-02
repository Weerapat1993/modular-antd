import React from 'react'
import Case from 'case'
import { bool, shape, number, func, string } from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, BackTop } from 'antd';
import logo from '../../assets/images/logo.svg'
import './styles.css'
import Routes from '../../routes'
import { menuBar } from '../../config'
import { AuthFacebook } from '../../features'

const { Content, Footer, Sider } = Layout

class Layouts extends React.Component {
  static propTypes = {
    isMobile: bool.isRequired,
    dimenstion: shape({
      width: number.isRequired,
      height: number.isRequired,
    }).isRequired,
    history: shape({
      push: func.isRequired
    }).isRequired,
    location: shape({
      pathname: string.isRequired
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      collapsed: false,
      positionFixed: true,
    }

    this.onCollapse = this.onCollapse.bind(this)
    this.onMenuKey = this.onMenuKey.bind(this)
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  onMenuKey({ key, keyPath }) {
    const { history, location } = this.props
    const route = {
      pathname: key,
      state: { keyPath }
    }
    if(key !== location.pathname) {
      history.push(route)
    }
  }

  getSize() {
    const { isMobile, dimenstion } = this.props
    if(isMobile) {
      return {
        minWidth: dimenstion.width
      }
    }
    return {}
  }
  
  render() {
    const { location, isMobile } = this.props
    const { collapsed, positionFixed } = this.state
    const breadcrumbs = location.pathname.split(new RegExp('/','g')).slice(1)
    const keyPath = _.get(location, 'state.keyPath', [location.pathname])
    const menuStyle = positionFixed ? {
      position: 'fixed',
      height: `100%`
    } : {}
    const layoutStyle = positionFixed ? { marginLeft: !collapsed ? 200 : 0 } : {}
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onCollapse={this.onCollapse}
          style={{ zIndex: 500, ...menuStyle }}
        >
          <div className='ant-logo'>
            <img alt='logo' src={logo} className='ant-logo-img' />
          </div>
          <Menu theme="dark" defaultSelectedKeys={keyPath} mode="inline" onClick={this.onMenuKey} >
            {
              menuBar.map(item => (
                <Menu.Item key={item.path} >
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout style={layoutStyle}>
          { !collapsed && isMobile && <div className='dark-bg' /> }
          <Content style={{ margin: 0 }}>
            <Breadcrumb style={{ margin: '16px 24px', ...this.getSize() }}>
              <Breadcrumb.Item><Icon type="home" /> <Link to='/'>Home</Link></Breadcrumb.Item>
              {
                breadcrumbs.map((item, i) => (
                  (i !== breadcrumbs.length - 1) ? (
                    <Breadcrumb.Item key={item}><Link to={`/${item}`}>{Case.capital(item)}</Link></Breadcrumb.Item>
                  ) : (
                    <Breadcrumb.Item key={item}>{Case.capital(item)}</Breadcrumb.Item>
                  )
                ))
              }
            </Breadcrumb>
            <div className='pull-right'>
              <AuthFacebook isMobile />
            </div>
            <div style={{ padding: 24, background: '#fff', minHeight: 300, ...this.getSize() }}>
              <Routes />
            </div>
            <BackTop />
          </Content>
          <Footer style={{ textAlign: 'center', ...this.getSize() }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Layouts
