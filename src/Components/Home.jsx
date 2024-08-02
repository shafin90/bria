import React, { lazy, Suspense } from 'react';
import './Home.css';

const HeaderHome = lazy(() => import('./HeaderHome'));
const OurServicesHome = lazy(() => import('./OurServicesHome'));
const AboutUsHome = lazy(() => import('./AboutUsHome'));
const WhatsAppPromotion = lazy(() => import('./WhatsAppPromotion'));
const TestemonialsHome = lazy(() => import('./TestemonialsHome'));
const MeetOurTeamHome = lazy(() => import('./MeetOurTeamHome'));

const Home = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderHome />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <OurServicesHome />
      </Suspense>
      <div id="aboutSection">
        <Suspense fallback={<div>Loading...</div>}>
          <AboutUsHome />
        </Suspense>
      </div>
      <div id="contactSection">
        <Suspense fallback={<div>Loading...</div>}>
          <WhatsAppPromotion />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TestemonialsHome />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MeetOurTeamHome />
      </Suspense>
    </>
  );
};

export default Home;
