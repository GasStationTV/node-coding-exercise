import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" >GSTV - Example</Link>
        </h1>
        {
          context.router.isActive('/', true)
            ? <a className={styles['add-site-button']} href="#" onClick={props.toggleAddSite}>Add Site</a>
            : null
        }

      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddSite: PropTypes.func.isRequired
};

export default Header;
