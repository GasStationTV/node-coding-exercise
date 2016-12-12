/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import sites from './modules/Site/SiteReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  sites
});
