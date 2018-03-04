import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Page from './pages'
import { ErrorPage } from './components'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Page.Home} />
    <Route path="/about" component={Page.About} />
    <Route path="/shop" component={Page.Shop} />
    <Route path="/github" component={Page.Github.Home} />
    <Route exact path="/article" component={Page.Article.Home} />
    <Route path="/article/create" component={Page.Article.Create} />
    <Route exact path="/article/:id" component={Page.Article.Detail} />
    <Route path="/article/:id/edit" component={Page.Article.Edit} />
    <Route path='*' component={ErrorPage} />
  </Switch>
)

export default Routes