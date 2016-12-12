import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_SITE = 'ADD_SITE';
export const ADD_SITES = 'ADD_SITES';
export const DELETE_SITE = 'DELETE_SITE';

// Export Actions
export function addSite(site) {
  return {
    type: ADD_SITE,
    site,
  };
}

export function addSiteRequest(site) {
  return (dispatch) => {
    return callApi('sites', 'post', {
        name: site.name
    }).then(res => dispatch(addSite(res.site)));
  };
}

export function addSites(sites) {
  return {
    type: ADD_SITES,
    sites,
  };
}

export function fetchSites() {
  return (dispatch) => {
    return callApi('sites').then(res => {
      dispatch(addSites(res.sites));
    });
  };
}

export function fetchSite(id) {
  return (dispatch) => {
    return callApi(`sites/${id}`).then(res => dispatch(addSite(res.site)));
  };
}

export function deleteSite(id) {
  return {
    type: DELETE_SITE,
    id,
  };
}

export function deleteSiteRequest(id) {
  return (dispatch) => {
    return callApi(`sites/${id}`, 'delete').then(() => dispatch(deleteSite(id)));
  };
}
