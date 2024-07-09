import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import './NavBarListItem.css';

const NavBarListItem = ({ listItem, to }) => {
  const navigate = useNavigate();

  const handleScrollToSection = (section) => {
    navigate('/');
    setTimeout(() => {
      scroller.scrollTo(section, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -200,
      });
    }, 100);
  };

  if (to === '/contact') {
    return (
      <span className='listItemLink' onClick={() => handleScrollToSection('contactSection')}>
        <span className='listItemName'>{listItem}</span>
      </span>
    );
  } else if (to === '/about') {
    return (
      <span className='listItemLink' onClick={() => handleScrollToSection('aboutSection')}>
        <span className='listItemName'>{listItem}</span>
      </span>
    );
  } else {
    return (
      <RouterLink to={to} className='listItemLink' >
        <span className='listItemName'>{listItem}</span>
      </RouterLink>
    );
  }
};

export default NavBarListItem;