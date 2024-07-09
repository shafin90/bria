import React from 'react';
import styles from './SummarySection.module.css';

const SummarySection = ({ data, Text, graphData, graphIcon, iconSrc }) => {
  const isGraphIconDown = graphIcon === '../assets/nav-arrow-down-admin.png';

  return (
    <div className={styles.summaryCard}>
      <h3>{data}</h3>
      <p>{Text}</p>
      <span className={styles.percentage} style={{ color: isGraphIconDown ? '#FF0000' : '#008000' }}>
        {graphData}
        <img src={graphIcon} alt="icon" />
      </span>
      <div className={styles.Icon}>
        <img src={iconSrc} alt="" />
      </div>
    </div>
  );
};

export default SummarySection;