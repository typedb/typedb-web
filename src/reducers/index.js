import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import { routerReducer } from 'react-router-redux';
import careers from './careers';
import team from './team';
import downloads from './downloads';
import events from './events';
import meetups from './meetups';
import testimonials from './testimonials';
import kgmsfeatures from './kgmsfeatures';
import deployment from './deployment';
import supportTable from './supportTable';
import kgmsTable from './kgmsTable';
import workbaseTable from './workbaseTable';
import companies from './companies';

export default combineReducers({
  browser: responsiveStateReducer,
  router: routerReducer,
  careers,
  team,
  downloads,
  events,
  meetups,
  testimonials,
  kgmsfeatures,
  deployment,
  supportTable,
  kgmsTable,
  workbaseTable,
  companies
})