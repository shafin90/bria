import React, { useState, useEffect, useRef } from 'react';
import './OurServicesRewards.css';
import MenServicesRewards from './MenServicesRewards';
import WomenServicesRewards from './WomenServicesRewards';

const OurServicesHome = () => {
  const [activeTab, setActiveTab] = useState('men');
  const [preload, setPreload] = useState(false);
  const [transition, setTransition] = useState(false);
  const menButtonRef = useRef(null);
  const womenButtonRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    setPreload(true);
    updateIndicator();
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTransition(false);
    }, 300);
  };

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
    <div className='ourServicesWrapper'>
      <div className='header'>
        <h2>Our Services</h2>
        <div className='buttons'>
          <div className='indicator' ref={indicatorRef} />
          <button ref={menButtonRef} className={activeTab === 'men' ? 'active' : ''} onClick={() => handleTabClick('men')}>Men</button>
          <button ref={womenButtonRef} className={activeTab === 'women' ? 'active' : ''} onClick={() => handleTabClick('women')}>Women</button>
        </div>
      </div>
      <div className={`servicesGrid ${transition ? 'fade-out' : 'fade-in'}`}>
        {activeTab === 'men' ? <MenServicesHomeRewards /> : <WomenServicesHomeRewards />}
      </div>
      {preload && (
        <div className='preload'>
          <MenServicesRewards />
          <WomenServicesHomeRewards />
        </div>
      )}
      <div className='footer'>
        <div className='footerSvgContainer'>
          <svg xmlns="http://www.w3.org/2000/svg" className="footerSvg" viewBox="0 0 1189 16" fill="none">
            <path d="M1188.71 8.70711C1189.1 8.31658 1189.1 7.68342 1188.71 7.29289L1182.34 0.928932C1181.95 0.538408 1181.32 0.538408 1180.93 0.928932C1180.54 1.31946 1180.54 1.95262 1180.93 2.34315L1186.59 8L1180.93 13.6569C1180.54 14.0474 1180.54 14.6805 1180.93 15.0711C1181.32 15.4616 1181.95 15.4616 1182.34 15.0711L1188.71 8.70711ZM0 9H1188V7H0V9Z" fill="#E396E2"/>
          </svg>
        </div>
        <a href='#' className='viewAll'>View all</a>
      </div>
    </div>
  );
};

export default OurServicesHome;