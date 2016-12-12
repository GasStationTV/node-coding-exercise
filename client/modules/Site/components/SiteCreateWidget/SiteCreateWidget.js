import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './SiteCreateWidget.css';

export class SiteCreateWidget extends Component {
  addSite = () => {
    const nameRef = this.refs.name;

    if (nameRef.value) {
      this.props.addSite(nameRef.value);
      nameRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddSite ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>create new site</h2>
          <input placeholder="name" className={styles['form-field']} ref="name" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addSite}>submit</a>
        </div>
      </div>
    );
  }
}

SiteCreateWidget.propTypes = {
  addSite: PropTypes.func.isRequired,
  showAddSite: PropTypes.bool.isRequired
};

export default SiteCreateWidget;
