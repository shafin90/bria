import React, { useState, useEffect } from 'react';
import styles from './AdminServices.module.css';
import AddNewService from './AddNewService';
import DeleteServicePopUp from './DeleteServicePopUp';
import addButton from '../../assets/addButton.png';
import nobooking from '../../assets/noServices.svg';
import { baseURL } from '../../baseUrl';

const AdminServices = ({ onAddServiceClick }) => {
  const servicesPerPage = 10;
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editServiceData, setEditServiceData] = useState(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    fetch(`${baseURL}/service/getAllService`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.services && Array.isArray(data.services)) {
          setServices(data.services);
          setTotalPages(data.totalPages);
        } else {
          throw new Error('Invalid data structure received from server');
        }
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  };

  const deleteService = (id) => {
    fetch(`${baseURL}/service/deleteService/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedServices = services.filter(service => service._id !== id);
        setServices(updatedServices);
        setTotalPages(Math.ceil(updatedServices.length / servicesPerPage));
        setShowDeletePopup(false);
      })
      .catch(error => {
        console.error('Error deleting service:', error);
      });
  };

  const handleEditService = (id) => {
    fetch(`${baseURL}/service/getParticularServiceById/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEditServiceData(data);
        setShowAddServiceModal(true);
      })
      .catch(error => {
        console.error('Error fetching particular service:', error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentServices = services.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const renderPagination = () => {
    const pagination = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(
          <div
            key={i}
            className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </div>
        );
      }
    } else {
      let startPage = 1;
      let endPage = totalPages;

      if (currentPage <= maxPagesToShow - 2) {
        endPage = maxPagesToShow - 1;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - (maxPagesToShow - 2);
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        pagination.push(
          <div
            key={i}
            className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </div>
        );
      }

      if (startPage > 2) {
        pagination.unshift(
          <div key="ellipsis-start" className={styles.pageNumber}>...</div>
        );
        pagination.unshift(
          <div
            key={1}
            className={`${styles.pageNumber} ${currentPage === 1 ? styles.active : ''}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </div>
        );
      }

      if (endPage < totalPages - 1) {
        pagination.push(
          <div key="ellipsis-end" className={styles.pageNumber}>...</div>
        );
        pagination.push(
          <div
            key={totalPages}
            className={`${styles.pageNumber} ${currentPage === totalPages ? styles.active : ''}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </div>
        );
      }
    }

    return pagination;
  };

  const handleDeleteButtonClick = (id) => {
    setServiceToDelete(id);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    setServiceToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete);
    }
  };

  return (
    <>
      {showAddServiceModal ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowAddServiceModal(false)}>&times;</span>
            <AddNewService
              onBack={() => setShowAddServiceModal(false)}
              onContinue={() => {
                setShowAddServiceModal(false);
                fetchServices();
              }}
              editData={editServiceData || null}
            />
          </div>
        </div>
      ) : (
        <div className={styles.adminServicesWrapper}>
          <div className={styles.header}>
            <h1>Services</h1>
            <button onClick={() => onAddServiceClick()} className={styles.addButton}>
              <img src={addButton} alt="Add Service" />
              Add Service
            </button>
          </div>
          {services.length === 0 ? (
            <div className={styles.noServicesWrapper}>
              <img src={nobooking} alt="No Services" className={styles.noServicesImage} />
              <h2>Add Services</h2>
              <p>Start making sales by adding your products. You can edit and manage our products at any time.</p>
            </div>
          ) : (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th>Price</th>
                      <th>Service Type</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentServices.map((service, index) => (
                      <tr key={index}>
                        <td style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <img src={service.img} alt={service.serviceName} className={styles.serviceImage} />
                          <p className={styles.name}>{service.serviceName}</p>
                        </td>
                        <td className={styles.amount}>₹ {service.price}</td>
                        <td className={styles.type}>
                          <p>{service.serviceType}</p>
                        </td>
                        <td>
                          <button className={styles.editButton} onClick={() => handleEditService(service._id)}>Edit</button>
                          <button className={styles.deleteButton} onClick={() => handleDeleteButtonClick(service._id)}>Delete</button>
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

          {showDeletePopup && (
            <DeleteServicePopUp 
              onClose={handleCloseDeletePopup} 
              onDelete={handleConfirmDelete} 
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminServices;