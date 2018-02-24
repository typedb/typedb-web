// Create final store using all reducers and applying middleware
import { createBrowserHistory } from 'history';
// Redux utility functions
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import {responsiveStoreEnhancer} from 'redux-responsive';

// Import all reducers
import reducer from 'reducers';

// Configure reducer to store state at state.router
// You can store it elsewhere by specifying a custom `routerStateSelector`
// in the store enhancer below
export const history = createBrowserHistory();

let preloadedState = {};
if (typeof window != 'undefined' && window.__PRELOADED_STATE__) {
    preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
}

const router = routerMiddleware(history)
const composeEnhancers = (typeof window != 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;;

const store = createStore(
  connectRouter(history)(reducer),
  preloadedState,
  composeEnhancers(
    responsiveStoreEnhancer,
    applyMiddleware(thunk, router),
  )
);

export default store;