import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive'
import careers from './careers';

export default combineReducers({
  browser: responsiveStateReducer,
  careers,
})