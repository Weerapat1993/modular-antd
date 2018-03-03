import React from 'react'
import { shape, number, string, func } from 'prop-types'
import _ from 'lodash'
import Case from 'case'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, BackTop } from 'antd'
import Routes from '../../routes'
import './styles.css'
import styles from './styles'
import { menuBar } from '../../config'
import { AuthFacebook } from '../../features/auth'

const { Header, Content, Footer } = Layout

const Layouts = props => {
  const { location, history, dimenstion } = props
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
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={keyPath}
          className='container'
          onClick={onMenuKey}
          style={styles.menuStyle}
        >
          {
            menuBar.map(item => (
              <Menu.Item key={item.path} >
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Menu.Item>
            ))
          }
        </Menu>
        <div className='pull-right'>
          <AuthFacebook />
        </div>
      </Header>
      <Content className='container' style={styles.contentStyle}>
        <Breadcrumb style={styles.breedcrumbStyle}>
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
        <div style={contentStyle}>
          <Routes />
        </div>
        <BackTop />
      </Content>
      <Footer className='text-center'>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  )
}

Layouts.propTypes = {
  location: shape({ pathname: string }).isRequired,
  history: shape({ push: func }).isRequired,
  dimenstion: shape({ width: number, height: number }).isRequired,
}

export default Layouts