import React from 'react';
import './RewardButton.css';

const RewardButton = ({ buttonText }) => {
  return (
    <>
      <button className="navButton rewardsButton">{buttonText}</button>
    </>
  );
};

export default RewardButton;