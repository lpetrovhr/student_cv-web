import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import reducers from '../reducers'


const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)

function configureStore () {
  
  let store = createStore(reducer, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  let persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore;
