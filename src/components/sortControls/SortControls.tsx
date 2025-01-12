import React from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';

import styles from './sortControls.module.scss';

interface SortControlsProps {
  sortConfig: { key: string; order: string };
  onSortChange: (key: string, order: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortConfig, onSortChange }) => {
  const handleSortChange = (key: string) => {
    onSortChange(key, sortConfig.order);
  };

  const toggleSortOrder = () => {
    const newOrder = sortConfig.order === 'ascending' ? 'descending' : 'ascending';
    onSortChange(sortConfig.key, newOrder);
  };

  return (
    <div className={styles.sortContainer}>
      <div className={styles.sortKey}>
        <label className={styles.label} htmlFor="sortKey">
          Sort By:
        </label>
        <select
          id="sortKey"
          value={sortConfig.key}
          className={styles.select}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="reward">Reward</option>
          <option value="expiresIn">Expires In</option>
          <option value="probability">Probability</option>
        </select>
      </div>
      <div className={styles.sortToggle}>
        <button className={styles.toggleButton} type="button" onClick={toggleSortOrder}>
          <span className={styles.arrowIcon}>
            {sortConfig.order === 'ascending' ? (
              <>
                <FaArrowUpLong color="black" />
                <FaArrowDownLong color="grey" />
              </>
            ) : (
              <>
                <FaArrowUpLong color="grey" />
                <FaArrowDownLong color="black" />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SortControls;
