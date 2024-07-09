import React, { useState, useEffect } from 'react';
import styles from './AdminOffers.module.css';
import AddNewOffer from './AddNewOffer'; // Assuming this is where the add/edit form resides
import addButton from '../../assets/addButton.png';
import noOffers from '../../assets/noOffers.svg';
import searchIcon from '../../assets/searchIcon.png';
import { baseURL } from '../../baseUrl';

const AdminOffers = ({ onAddOfferClick }) => {
  const [offers, setOffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [editOfferData, setEditOfferData] = useState(null);
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch(`${baseURL}/offer/getAllOffer`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleEditOffer = (id) => {
    fetch(`${baseURL}/offer/getParticularOfferById/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEditOfferData(data);
        setShowAddOfferModal(true);
      })
      .catch(error => {
        console.error('Error fetching particular offer:', error);
      });
  };

  const cancelEdit = () => {
    setShowAddOfferModal(false);
    setEditOfferData(null);
  };

  const filteredOffers = offers.filter(offer =>
    (offer.offerName && offer.offerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (offer.code && offer.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredByStatus = (status) => {
    return filteredOffers.filter(offer => offer.status === status);
  };

  const renderOffers = (offersToRender) => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Offer Name</th>
            <th>Usage</th>
            <th>Status</th>
            <th>Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {offersToRender.map((offer, index) => (
            <tr key={index}>
              <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className={styles.editIcon}>
                  <img src={`${baseURL}/${offer.offerImg}`} alt="Edit" />
                </div>
                <p className={styles.name}>{offer.offerName}</p>
              </td>
              <td>{offer.usageLimit}</td>
              <td>
                <span className={offer.status === 'Active' ? styles.activeStatus : styles.inactiveStatus}>
                  {offer.status}
                </span>
              </td>
              <td>{`${offer.startDate} - ${offer.endDate}`}</td>
              <td>
                <button className={styles.editButton} onClick={() => handleEditOffer(offer._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.adminOffersWrapper}>
      <div className={styles.header}>
        <h1>Offers</h1>
        <button className={styles.addButton} onClick={onAddOfferClick}>
          <img src={addButton} alt="Create Offer" />
          Create
        </button>
      </div>
      {showAddOfferModal ? (
        <AddNewOffer
          onBack={cancelEdit}
          onContinue={() => {
            cancelEdit();
            fetchOffers();
          }}
          editData={editOfferData}
        />
      ) : (
        <>
          {offers.length === 0 ? (
            <div className={styles.noOffersWrapper}>
              <img src={noOffers} alt="No Offers" className={styles.noOffersImage} />
              <h2>Add Offers</h2>
              <p>Offering incentives to our customers rewards their loyalty and encourages them to return to us consistently.</p>
            </div>
          ) : (
            <>
              <div className={styles.navBar}>
                <div className={styles.firstPart}>
                  <div onClick={() => setActiveTab('all')} className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}>All Offers</div>
                  <div onClick={() => setActiveTab('active')} className={`${styles.tab} ${activeTab === 'active' ? styles.activeTab : ''}`}>Active Offers</div>
                  <div onClick={() => setActiveTab('expired')} className={`${styles.tab} ${activeTab === 'expired' ? styles.activeTab : ''}`}>Expired Offers</div>
                </div>
                <div className={styles.searchBar}>
                  <img src={searchIcon} alt="Search" />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                  />
                </div>
              </div>
              <div className={styles.tableWrapper}>
                {activeTab === 'all' && renderOffers(filteredOffers)}
                {activeTab === 'active' && renderOffers(filteredByStatus('Active'))}
                {activeTab === 'expired' && renderOffers(filteredByStatus('Inactive'))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminOffers;