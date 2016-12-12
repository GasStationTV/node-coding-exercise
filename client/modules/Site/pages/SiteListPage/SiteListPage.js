import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import SiteList from '../../components/SiteList';
import SiteCreateWidget from '../../components/SiteCreateWidget/SiteCreateWidget';

// Import Actions
import { addSiteRequest, fetchSites, deleteSiteRequest } from '../../SiteActions';
import { toggleAddSite } from '../../../App/AppActions';

// Import Selectors
import { getShowAddSite } from '../../../App/AppReducer';
import { getSites } from '../../SiteReducer';

class SiteListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSites());
  }

  handleDeleteSite = site => {
    if (confirm('Do you want to delete this site')) { // eslint-disable-line
      this.props.dispatch(deleteSiteRequest(site));
    }
  };

  handleAddSite = (name) => {
    this.props.dispatch(toggleAddSite());
    this.props.dispatch(addSiteRequest({ name }));
  };

  render() {
    return (
      <div>
        <SiteCreateWidget addSite={this.handleAddSite} showAddSite={this.props.showAddSite} />
        <SiteList handleDeleteSite={this.handleDeleteSite} sites={this.props.sites} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
SiteListPage.need = [() => { return fetchSites(); }];

// Retrieve data from store as props
function mapStateToProps(state) {

  return {
    showAddSite: getShowAddSite(state),
    sites: getSites(state),
  };
}

SiteListPage.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
  showAddSite: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

SiteListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(SiteListPage);
