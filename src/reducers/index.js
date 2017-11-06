import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive'

export default combineReducers({
  browser: responsiveStateReducer,    
})