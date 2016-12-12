import { ADD_SITE, ADD_SITES, DELETE_SITE } from './SiteActions';

// Initial State
const initialState = { data: [] };

const SiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SITE :
      return {
        data: [action.site, ...state.data],
      };

    case ADD_SITES :
      return {
        data: action.sites,
      };

    case DELETE_SITE :
      return {
        data: state.data.filter(site => site._id !== action.id),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all sites
export const getSites = state => state.sites.data;

// Get site by id
export const getSite = (state, id) => state.sites.data.filter(site => site._id === id)[0];

// Export Reducer
export default SiteReducer;
