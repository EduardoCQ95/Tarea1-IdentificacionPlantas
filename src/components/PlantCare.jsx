import React from 'react';
import '../styles/PlantCare.css';

export const PlantCare = ({ plant }) => {
  if (!plant) {
    return null;
  }

  const { care, advice } = plant;

  return (
    <div className="plant-care">
      <h2>🌿 Cuidados de la Planta</h2>
      
      <div className="care-list">
        <div className="care-item">
          <span className="care-icon">☀️</span>
          <div className="care-content">
            <strong>Luz:</strong>
            <p>{care.light}</p>
          </div>
        </div>

        <div className="care-item">
          <span className="care-icon">💧</span>
          <div className="care-content">
            <strong>Riego:</strong>
            <p>{care.watering}</p>
          </div>
        </div>

        <div className="care-item">
          <span className="care-icon">💨</span>
          <div className="care-content">
            <strong>Humedad:</strong>
            <p>{care.humidity}</p>
          </div>
        </div>

        <div className="care-item">
          <span className="care-icon">🌱</span>
          <div className="care-content">
            <strong>Sustrato:</strong>
            <p>{care.substrate}</p>
          </div>
        </div>
      </div>

      <div className="advice-box">
        <span className="advice-icon">💡</span>
        <p><strong>Consejo:</strong> {advice}</p>
      </div>
    </div>
  );
};
