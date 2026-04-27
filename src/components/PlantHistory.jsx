import React from 'react';
import '../styles/PlantHistory.css';

export const PlantHistory = ({ plant }) => {
  if (!plant) {
    return null;
  }

  return (
    <div className="plant-history">
      <h2>📖 Historia y Origen</h2>
      
      <div className="history-content">
        <p>{plant.description}</p>
      </div>
    </div>
  );
};
