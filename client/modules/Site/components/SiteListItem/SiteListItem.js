import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './SiteListItem.css';

function SiteListItem(props) {
  return (
    <div className={styles['divTableRow']}>
      <div className={styles['divTableCell']}><Link to={`/sites/${props.site._id}`} >
          {props.site.name}
        </Link></div>
      <div className={styles['divTableCell']}>
        {props.site._id}
      </div>
      <div className={styles['divTableCell']}>
        <a href="#" onClick={props.onDelete}>delete</a>
      </div>
    </div>
  );
}

SiteListItem.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SiteListItem;
