import React, { useState } from 'react';
import AdminServices from './AdminServices';
import AddNewService from './AddNewService';

const ServiceManager = () => {
  const [showAddNewService, setShowAddNewService] = useState(false);

  const handleAddServiceClick = () => {
    setShowAddNewService(true);
  };

  const handleBackToAdminServices = () => {
    setShowAddNewService(false);
  };

  return (
    <div>
      {!showAddNewService ? (
        <AdminServices onAddServiceClick={handleAddServiceClick} />
      ) : (
        <AddNewService onBack={handleBackToAdminServices} onContinue={handleBackToAdminServices} />
      )}
    </div>
  );
};

export default ServiceManager;