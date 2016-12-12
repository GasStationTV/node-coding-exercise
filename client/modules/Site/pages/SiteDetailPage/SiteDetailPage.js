import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from '../../components/SiteListItem/SiteListItem.css';

// Import Actions
import { fetchSite } from '../../SiteActions';

// Import Selectors
import { getSite } from '../../SiteReducer';

export function SiteDetailPage(props) {

  let hasSiteHours = null;
  let addEditButton =  <a href="#" onClick={this.editSite}>Edit Site Hours</a>

  if(props.site.schedules.length !== 0) {
    hasSiteHours = 'No Site Hours';
    addEditButton =  <a href="#" onClick={this.editSite}>Create Site Hours</a>
  }

  return (
    <div>
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <p className={styles['author-name']}>Site: {props.site.name} - {props.site._id}</p>
        <p>{addEditButton}</p>
      </div>
      <div>{hasSiteHours}</div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
SiteDetailPage.need = [params => {
  return fetchSite(params.id);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    site: getSite(state, props.params.id),
  };
}

SiteDetailPage.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    schedules : PropTypes.array.isRequied,
  }).isRequired,
};

export default connect(mapStateToProps)(SiteDetailPage);
