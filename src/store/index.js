import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import appReducer from '../reducers';

let createStoreWithMiddleware;

if (process.env.NODE_ENV == 'development') {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )(createStore)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            createStoreWithMiddleware.replaceReducer(appReducer);
        });
    }
} else {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunk)
    )(createStore);
}

const store = createStoreWithMiddleware(appReducer);

export default store;