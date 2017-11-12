import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from '../../store'

import Menu from './Menu'
import Routing from './Routing'

class App extends Component {

  render () {
  	const configs = configureStore()

    return (
      <Provider store={configs.store}>
	      <PersistGate persistor={configs.persistor}>
		      	<Router>
			      <main>
			      	<Menu />
			      	<div>
			      		<Routing />
			      	</div>
			      </main>
			    </Router>
		  </PersistGate>
	  </Provider>
    )
  }
}

export default App
