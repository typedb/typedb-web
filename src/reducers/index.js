import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive'
import careers from './careers';
import team from './team';
import downloads from './downloads';
import events from './events';

export default combineReducers({
  browser: responsiveStateReducer,
  careers,
  team,
  downloads,
  events
})