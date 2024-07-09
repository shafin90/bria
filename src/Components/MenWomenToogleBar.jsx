import React, { useEffect, useRef } from 'react';
import styles from './MenWomenToggleBar.module.css';

const MenWomenToggleBar = ({ activeTab, handleTabClick, style }) => {
  const menButtonRef = useRef(null);
  const womenButtonRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    updateIndicator();
  }, [activeTab]);

  const updateIndicator = () => {
    if (activeTab === 'men' && menButtonRef.current && indicatorRef.current) {
      const menButtonWidth = menButtonRef.current.offsetWidth;
      indicatorRef.current.style.width = `${menButtonWidth}px`;
      indicatorRef.current.style.left = '0';
    } else if (activeTab === 'women' && womenButtonRef.current && indicatorRef.current) {
      const womenButtonWidth = womenButtonRef.current.offsetWidth;
      indicatorRef.current.style.width = `${womenButtonWidth}px`;
      indicatorRef.current.style.left = `${menButtonRef.current.offsetWidth}px`;
    }
  };

  return (
    <div className={styles.toggleWrapper} style={style}>
      <div className={styles.buttons}>
        <div className={styles.indicator} ref={indicatorRef} />
        <button
          ref={menButtonRef}
          className={`${styles.button} ${activeTab === 'men' ? styles.active : ''}`}
          onClick={() => handleTabClick('men')}
        >
          Men
        </button>
        <button
          ref={womenButtonRef}
          className={`${styles.button} ${activeTab === 'women' ? styles.active : ''}`}
          onClick={() => handleTabClick('women')}
        >
          Women
        </button>
      </div>
    </div>
  );
};

export default MenWomenToggleBar;