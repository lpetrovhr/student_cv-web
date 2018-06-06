import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';


// Store config
import configureStore from './store';

// Components
import App from 'containers/App'

const configs = configureStore();

ReactDOM.render(
  <Provider store={configs.store}>
    <PersistGate persistor={configs.persistor}>
      <Router>
        <Switch>
          <Route path="/" name="Home" component={App} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/App/index.js', () => {
    const NextRootContainer = require('./containers/App/index.js').default
    ReactDOM.render(<NextRootContainer />, document.getElementById('root'))
  })
}
