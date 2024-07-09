import React, { useState } from 'react';
import styles from './AppointmentBookingMain.module.css';
import ProgressSteps from './ProgressSteps';
import YourOrder from './YourOrder';
import AppointmentBookingStep1 from './AppointmentBookingStep1';
import AppointmentBookingStep2 from './AppointmentBookingStep2';
import AppointmentBookingStep3 from './AppointmentBookingStep3';
import { useLocation } from 'react-router-dom';

const AppointmentBookingMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const location = useLocation();
  const serviceType = location.state?.serviceType || 'men';

  const handleDateTimeChange = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AppointmentBookingStep1 serviceType={serviceType} />;
      case 2:
        return <AppointmentBookingStep2 onDateTimeChange={handleDateTimeChange} />;
      case 3:
        return <AppointmentBookingStep3 />;
      default:
        return <AppointmentBookingStep1 serviceType={serviceType} />;
    }
  };

  return (
      <div className={styles.appointmentBookingWrapper}>
        <ProgressSteps currentStep={currentStep} />
        <div className={styles.SecondPart}>
          <div className={styles.SecondFirstPart}>
            {renderStep()}
            {(window.innerWidth >= 320 && window.innerWidth < 1024) && (
            <YourOrder
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
            )}
          </div>
          <div className={styles.SecondSecondPart}>
            <YourOrder
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>
        </div>
      </div>
  );
};

export default AppointmentBookingMain;