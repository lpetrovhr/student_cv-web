import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App'

ReactDOM.render(<App />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/App/index.js', () => {
    const NextRootContainer = require('./containers/App/index.js').default
    ReactDOM.render(<NextRootContainer />, document.getElementById('root'))
  })
}
