import React from 'react';
import './AboutUsHome.css';
import AboutImage from './AboutImage';
import AboutContent from './AboutContent';
import aboutUs1 from '../../assets/aboutUs 1.png';
import aboutUs2 from '../../assets/aboutUs 2.png';

const AboutUsHome = () => {
  return (
    <div className='aboutUsHomeWrapper'>
      <AboutContent heading={"About us"} para1={"At Bria Salon, we believe that beauty is not just about how you look, but how you feel. Nestled in the heart of Goregaon, Bria Salon is your premier destination for pampering and style."} para2={"Our team of expert stylists is dedicated to delivering top-notch services tailored to your unique needs and desires. We offer a comprehensive range of services to enhance your natural beauty and boost your confidence."} buttonTextAbout={"Book Appointment"}routeAbout={"/services"} />
      <div className='aboutImages'>
        <AboutImage src={aboutUs1} alt='Stylist working with a child' className='topImage' />
        <AboutImage src={aboutUs2} alt='Stylist with tattoos' className='bottomImage' />
      </div>
    </div>
  );
};

export default AboutUsHome;