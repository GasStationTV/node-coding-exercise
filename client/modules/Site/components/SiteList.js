import React, { PropTypes } from 'react';

// Import Components
import SiteListItem from './SiteListItem/SiteListItem';
import styles from './SiteListItem/SiteListItem.css';

function SiteList(props) {
  return (
    <div className={styles['divTable']} style={{width: '100%'}}>
      <div className={styles['divTableHeading']}>
        <div className={styles['divTableRow']}>
          <div className={styles['divTableCell']}>Site Name</div>
          <div className={styles['divTableCell']}>ID</div>
          <div className={styles['divTableCell']}></div>
        </div>
      </div>
      <div className={styles['divTableBody']}>
      {
        props.sites.map(site => (
          <SiteListItem
            site={site}
            key={site._id}
            onDelete={() => props.handleDeleteSite(site._id)}
          />
        ))
      }
      </div>
    </div>
  );
}

SiteList.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteSite: PropTypes.func.isRequired,
};

export default SiteList;
