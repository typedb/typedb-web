import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive'
import careers from './careers';
import team from './team';

export default combineReducers({
  browser: responsiveStateReducer,
  careers,
  team
})