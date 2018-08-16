import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from '../helpers/history';
import reducer from './reducers/';

const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true
});

let store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            logger
        )
    )
);

store.subscribe(() =>
    console.log(store.getState())
);

export default store;
