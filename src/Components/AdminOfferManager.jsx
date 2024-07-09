import React, { useState } from 'react';
import AdminOffers from './AdminOffers';
import AddNewOffer from './AddNewOffer';

const OfferManager = () => {
  const [showAddNewOffer, setShowAddNewOffer] = useState(false);

  const handleAddOfferClick = () => {
    setShowAddNewOffer(true);
  };

  const handleBackToAdminOffer = () => {
    setShowAddNewOffer(false);
  };

  return (
    <div>
      {!showAddNewOffer ? (
        <AdminOffers onAddOfferClick={handleAddOfferClick} />
      ) : (
        <AddNewOffer onBack={handleBackToAdminOffer} onContinue={handleBackToAdminOffer} />
      )}
    </div>
  );
};

export default OfferManager;