import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Page from './pages'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Page.Home} />
    <Route path="/about" component={Page.About} />
    <Route path="/shop" component={Page.Shop} />
    <Route path="/article" component={Page.Article} />
  </Switch>
)

export default Routes