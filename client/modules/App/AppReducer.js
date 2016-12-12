// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_SITE } from './AppActions';

// Initial State
const initialState = {
  showAddSite: false
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_ADD_SITE:
      return {
        showAddSite: !state.showAddSite,
      };
      break;
    default:
      return state;
  }
};

/* Selectors */

export const getShowAddSite = state => state.app.showAddSite;


// Export Reducer
export default AppReducer;
