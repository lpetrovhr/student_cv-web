import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
// Store config
import store from './store';

// Components
import App from 'containers/App';
import Login from 'containers/Login';
import StudentRegister from 'containers/StudentRegister';
import CompanyRegister from 'containers/CompanyRegister';

import 'bootstrap/dist/css/bootstrap.min.css';
// Import Main styles for this application
import 'styles/style.scss';
// Temp fix for reactstrap


ReactDOM.render(
  <Provider store={store} history={browserHistory}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register/student" component={StudentRegister} />
        <Route path="/register/company" component={CompanyRegister} />
        <App store={store} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/App/index.js', () => {
    const NextRootContainer = require('./containers/App/index.js').default
    ReactDOM.render(<NextRootContainer />, document.getElementById('root'))
  })
}
