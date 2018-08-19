import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import history from '../helpers/history';
import reducer from './reducers/';

const logger = createLogger({
    collapsed: true, // closed actions
    duration: true,
    diff: true
});

let store = createStore(
    reducer,
    applyMiddleware(thunk)
);

store.subscribe(() =>
    console.log(store.getState())
);

export default store;
