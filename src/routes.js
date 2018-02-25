import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Page from './pages'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Page.Home} />
    <Route path="/about" component={Page.About} />
    <Route path="/shop" component={Page.Shop} />
    <Route exact path="/article" component={Page.Article.Home} />
    <Route path="/article/create" component={Page.Article.Create} />
    <Route path="/article/:id" component={Page.Article.Detail} />
  </Switch>
)

export default Routes