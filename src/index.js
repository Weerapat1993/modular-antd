import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import Routes from './routes'
import configureStore from './config/store'
// import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <Provider store={configureStore()}>
    <Router>
      <Routes />
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
