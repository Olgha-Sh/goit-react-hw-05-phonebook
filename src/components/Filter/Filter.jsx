import React from 'react';
import T from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => (
  <>
    <div className={styles.filter_form}>
      <p className={styles.title}>Find contacts by name...</p>
      <input
        className={styles.filterInput}
        type="text"
        placeholder="Type to filter..."
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  </>
);

Filter.propTypes = {
  value: T.string.isRequired,
  onChangeFilter: T.func.isRequired,
};

export default Filter;
