// Create final store using all reducers and applying middleware
import { createBrowserHistory, createMemoryHistory } from 'history';
// Redux utility functions
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import {responsiveStoreEnhancer} from 'redux-responsive';
import logger from 'redux-logger'

// Import all reducers
import reducers from 'reducers';

// Configure reducer to store state at state.router
// You can store it elsewhere by specifying a custom `routerStateSelector`
// in the store enhancer below
export default function configureStore(fromServer) {
  const history = !fromServer ? createBrowserHistory() : createMemoryHistory();
  let preloadedState = {};
  if (typeof window != 'undefined' && window.__PRELOADED_STATE__) {
      preloadedState = window.__PRELOADED_STATE__;
      delete window.__PRELOADED_STATE__;
  }
  const router = routerMiddleware(history);
  const composeEnhancers = (typeof window != 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;;

  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(
      responsiveStoreEnhancer,
      applyMiddleware(thunk, router),
    )
  );
  return { store, history }
}
