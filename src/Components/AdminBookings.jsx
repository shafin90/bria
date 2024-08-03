import React, { useEffect, useState } from 'react';
import { baseURL } from '../../baseUrl';
import Modal from './Modal';
import image from '../../assets/noBookings.svg';
import styles from './AdminBookings.module.css'; // Import CSS module

const AdminBookings = () => {
  const [allBooking, setAllBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [totalBookings, setTotalBookings] = useState(null);
  const bookingsPerPage = 12;

  useEffect(() => {
    fetch(`${baseURL}/booking/getAllBooking?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setAllBooking(data.bookings);
        setTotalBookings(data.totalBookings);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, [currentPage]);

  // Calculate total pages based on fetched data
  const totalPages = Math.ceil((totalBookings / bookingsPerPage)) || 1;

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

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Number of pages to display at once
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

    if (endPage - startPage < maxPagesToShow - 1) {
      if (currentPage <= halfMaxPagesToShow) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    if (startPage > 1) {
      pageNumbers.push(
        <span key={1} className={styles.pageNumber} onClick={() => handlePageChange(1)}>
          1
        </span>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis" className={styles.ellipsis}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
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

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis" className={styles.ellipsis}>...</span>);
      }
      pageNumbers.push(
        <span key={totalPages} className={styles.pageNumber} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
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
                {allBooking.map((booking, index) => (
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
