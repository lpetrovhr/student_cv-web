import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import reducers from '../reducers';

// import {
//     addContact
// } from '../actions/contacts'


const config = {
    key: 'root',
    storage,
};

const reducer = persistCombineReducers(config, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore () {

    let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

    let persistor = persistStore(store);

    return { store, persistor };
}

export default configureStore;
