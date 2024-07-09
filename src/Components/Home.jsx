import React from 'react';
import HeaderHome from './HeaderHome';
import OurServicesHome from './OurServicesHome';
import AboutUsHome from './AboutUsHome';
import WhatsAppPromotion from './WhatsAppPromotion';
import TestemonialsHome from './TestemonialsHome';
import MeetOurTeamHome from './MeetOurTeamHome';
import './Home.css';

const Home = () => {
  return (
    <>
      <HeaderHome />
      <OurServicesHome />
      <div id="aboutSection">
        <AboutUsHome />
      </div>
      <div id="contactSection">
        <WhatsAppPromotion />
      </div>
      <TestemonialsHome />
      <MeetOurTeamHome />
    </>
  );
};

export default Home;