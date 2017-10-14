import { combineReducers } from 'redux';
import { site } from './reducer_site';
import { details } from './reducer_details';


export default combineReducers({
  site,
  details
})