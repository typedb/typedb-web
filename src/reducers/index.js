import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import { routerReducer } from 'react-router-redux';
import careers from './careers';
import team from './team';
import downloads from './downloads';
import events from './events';
import meetups from './meetups';
import testimonials from './testimonials';
import kbmsfeatures from './kbmsfeatures';
import deployment from './deployment';
import supportTable from './supportTable';
import kbmsTable from './kbmsTable';
import workbaseTable from './workbaseTable';

export default combineReducers({
  browser: responsiveStateReducer,
  router: routerReducer,
  careers,
  team,
  downloads,
  events,
  meetups,
  testimonials,
  kbmsfeatures,
  deployment,
  supportTable,
  kbmsTable,
  workbaseTable
})