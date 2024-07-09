import React, { useEffect, useState } from 'react';
import { baseURL } from '../../baseUrl';
import Modal from './Modal';
import nobooking from '../../assets/noBookings.svg';
import styles from './RecentBookings.module.css'; // Import your CSS module file

const RecentBookings = () => {
  const [allBooking, setAllBooking] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}/booking/getAllBooking`)
      .then(res => res.json())
      .then(data => setAllBooking(data.bookings.slice(0, 5))) // Limit to first 5 bookings
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  const handleDetailsClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div className={styles.recentBookings}>
      <h1 className={`${styles.text2xl} ${styles.fontBold} ${styles.mb4}`}>Recent Bookings</h1>
      {allBooking.length === 0 ? (
        <div className={styles.noBooking}>
          <img src={nobooking} alt="No Bookings" className={`${styles.mxAuto} ${styles.mb4}`} />
          <h2 className={styles.textXl}>No Orders Yet</h2>
          <p>All the upcoming bookings from your salon will be visible on this page.</p>
        </div>
      ) : (
        <>
          <div className={styles.overflowXAuto}>
            <table className={`${styles.tableAuto} ${styles.wFull} ${styles.textLeft} ${styles.borderCollapse}`}>
              <thead>
                <tr>
                  <th className={`${styles.px4} ${styles.py2} ${styles.border}`}>Name</th>
                  <th className={`${styles.px4} ${styles.py2} ${styles.border}`}>Date</th>
                  <th className={`${styles.px4} ${styles.py2} ${styles.border}`}>Amount</th>
                  <th className={`${styles.px4} ${styles.py2} ${styles.border}`}>Service Type</th>
                  <th className={`${styles.px4} ${styles.py2} ${styles.border}`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allBooking.map((booking, index) => (
                  <tr key={index}>
                    <td className={`${styles.px4} ${styles.py2} ${styles.border}`}>{booking.name}</td>
                    <td className={`${styles.px4} ${styles.py2} ${styles.border}`}>{booking.date}</td>
                    <td className={`${styles.px4} ${styles.py2} ${styles.border} ${styles.amount}`}>
                      ₹{booking.service.reduce((total, service) => total + service.servicePrice, 0)}
                    </td>
                    <td className={`${styles.px4} ${styles.py2} ${styles.border} ${styles.serviceType}`}>
                      {booking.service.map((s, i) => (
                        <p key={i}>{s.serviceName}</p>
                      ))}
                    </td>
                    <td className={`${styles.px4} ${styles.py2} ${styles.border}`}>
                      <button
                        className={`${styles.btn} ${styles.bgPurple700} ${styles.textWhite} ${styles.hoverBgPurple900}`}
                        onClick={() => handleDetailsClick(booking)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {selectedBooking && <Modal booking={selectedBooking} onClose={handleCloseModal} />}
    </div>
  );
};

export default RecentBookings;