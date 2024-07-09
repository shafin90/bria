import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SelectDate.css';
import { useServices } from '../Context/ServicesContext'; // Import ServicesContext
import sunrise from '../../assets/sunrise.png';
import sunriseselect from '../../assets/sunriseselect.svg';
import noon from '../../assets/noon.png';
import noonselect from '../../assets/noonselect.svg';
import evening from '../../assets/evening.png';
import eveningselect from '../../assets/eveningselect.svg';

const SelectDate = ({ onDateTimeChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [hoveredTime, setHoveredTime] = useState(null);
  const { setSelectedDateTime } = useServices(); // Destructure setSelectedDateTime from ServicesContext

  const times = [
    { label: '09:00 am', icon: sunrise, selectIcon: sunriseselect },
    { label: '10:00 am', icon: sunrise, selectIcon: sunriseselect },
    { label: '11:00 am', icon: sunrise, selectIcon: sunriseselect },
    { label: '12:00 pm', icon: noon, selectIcon: noonselect },
    { label: '01:00 pm', icon: noon, selectIcon: noonselect },
    { label: '05:00 pm', icon: evening, selectIcon: eveningselect },
  ];

  useEffect(() => {
    if (selectedDate && selectedTime) {
      onDateTimeChange(selectedDate, selectedTime); // Propagate date and time changes to parent or consumer
    }
  }, [selectedDate, selectedTime, onDateTimeChange]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleClick = (timeLabel) => {
    setSelectedTime(timeLabel);
    setSelectedDateTime(selectedDate, timeLabel); // Update selected date and time in context on time click
  };

  const handleMouseEnter = (timeLabel) => {
    setHoveredTime(timeLabel);
  };

  const handleMouseLeave = () => {
    setHoveredTime(null);
  };

  const getIconSrc = (time) => {
    if (time.label === selectedTime || time.label === hoveredTime) {
      return time.selectIcon;
    }
    return time.icon;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison

  return (
    <div className="container">
      <div className="datePickerContainer">
        <h2>Choose Date & Time</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateClick}
          inline
          minDate={new Date(today.setDate(today.getDate() + 1))} // Ensure only future dates are selectable
          calendarClassName="customCalendar"
          dayClassName={(date) =>
            date.getMonth() === new Date().getMonth() ? 'currentMonth' : 'otherMonth'
          }
        />
      </div>
      <div className="select-time">
        <h2>Select the time for the visit</h2>
        <div className="time-options">
          {times.map((time, index) => (
            <div
              key={index}
              className={`time-option ${selectedTime === time.label ? 'selected' : ''}`}
              onClick={() => handleClick(time.label)}
              onMouseEnter={() => handleMouseEnter(time.label)}
              onMouseLeave={handleMouseLeave}
            >
              <img className="icon" src={getIconSrc(time)} alt={time.label} />
              <span className="label">{time.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectDate;