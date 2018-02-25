import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './components'
import configureStore from './config/store'
// import registerServiceWorker from './registerServiceWorker';
import './styles/github-markdown.css'

const Index = () => (
  <Provider store={configureStore()}>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>
)

ReactDOM.render(<Index />, document.getElementById('root'));
// registerServiceWorker();
