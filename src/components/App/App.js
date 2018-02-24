import React from 'react'
import withSizes from 'react-sizes'
import _ from 'lodash'
import Case from 'case'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import './styles.css'
import styles from './styles'

const { Header, Content, Footer } = Layout

const sideMenu = [
  { path: '/', icon: 'home', title: 'Home' },
  { path: '/about', icon: 'book', title: 'About' },
]

const Layouts = props => {
  const { children, location, history, dimenstion, isDesktop } = props
  const onMenuKey = ({ key, keyPath }) => {
    const route = {
      pathname: key,
      state: { keyPath }
    }
    if(key !== location.pathname) {
      history.push(route)
    }
  }
  const breadcrumbs = location.pathname.split(new RegExp('/','g')).slice(1)
  const keyPath = _.get(location, 'state.keyPath', [location.pathname])
  const getHeight = dimenstion.height - (64 + 120)
  const contentStyle = {
    background: '#fff', 
    padding: 24, 
    minHeight: getHeight,
  }
  return (
    <Layout>
      <Header style={styles.headerStyle}>
        { isDesktop && <div className="logo" /> }
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={keyPath}
          className='container'
          onClick={onMenuKey}
          style={styles.menuStyle}
        >
          {
            sideMenu.map(item => (
              <Menu.Item key={item.path}  >
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Menu.Item>
            ))
          }
        </Menu>
      </Header>
      <Content className='container' style={styles.contentStyle}>
        <Breadcrumb style={styles.breedcrumbStyle}>
          <Breadcrumb.Item><Icon type="home" /> <Link to='/'>Home</Link></Breadcrumb.Item>
          {
            breadcrumbs.map((item) => (
              <Breadcrumb.Item key={item}>{Case.capital(item)}</Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
        <div style={contentStyle}>
          {children}
        </div>
      </Content>
      <Footer className='text-center'>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  )
}

const mapSizesToProps = ({ width, height }) => ({
  isDesktop: width > 1024,
  dimenstion: {
    width, 
    height,
  }
})

export default withSizes(mapSizesToProps)(Layouts)