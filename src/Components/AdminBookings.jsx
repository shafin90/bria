import React, { useEffect, useState } from 'react';
import { baseURL } from '../../baseUrl';
import Modal from './Modal';
import image from '../../assets/noBookings.svg';
import styles from './AdminBookings.module.css'; // Import CSS module

const AdminBookings = () => {
  const [allBooking, setAllBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookingsPerPage = 10;

  useEffect(() => {
    fetch(`${baseURL}/booking/getAllBooking`)
      .then(res => res.json())
      .then(data => {
        setAllBooking(data.bookings);
        setCurrentPage(1); // Reset to first page when data changes
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  // Calculate total pages based on fetched data
  const totalPages = Math.ceil(allBooking.length / bookingsPerPage) || 1;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleDetailsClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  const currentBookings = allBooking.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.adminBookingWrapper}>
      <h1>Bookings</h1>
      {allBooking.length === 0 ? (
        <div className={styles.noOrdersWrapper}>
          <img src={image} alt="No Bookings" className={styles.noBookingsImage} />
          <h2>No Orders Yet</h2>
          <p>All the upcoming bookings from your salon will be visible on this page.</p>
        </div>
      ) : (
        <>
          <div className={styles.overflowContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => (
                  <tr key={index}>
                    <td className={`${styles.tableCell} ${styles.name}`}>{booking.name}</td>
                    <td className={`${styles.tableCell} ${styles.date}`}>{booking.date}</td>
                    <td className={`${styles.tableCell} ${styles.amount}`}>
                      ₹{booking.service.reduce((total, service) => total + service.servicePrice, 0)}
                    </td>
                    <td className={styles.tableCell}>
                      <button
                        className={`${styles.button} ${styles.buttonPrimary}`}
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
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`${styles.arrow} ${currentPage === 1 ? styles.disabled : ''}`}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`${styles.arrow} ${currentPage === totalPages ? styles.disabled : ''}`}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
      {selectedBooking && <Modal booking={selectedBooking} onClose={handleCloseModal} />}
    </div>
  );
};

export default AdminBookings;