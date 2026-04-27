import React from 'react';
import '../styles/IdentificationResults.css';

export const IdentificationResults = ({ preview, identification }) => {
  if (!identification) {
    return null;
  }

  const { primary, alternatives } = identification;
  const { plant, confidence } = primary;

  return (
    <div className="identification-results">
      <h2>✨ Resultados de Identificación</h2>
      
      <div className="main-result">
        {preview && (
          <div className="result-image">
            <img src={preview} alt="Planta identificada" />
          </div>
        )}
        
        <div className="result-info">
          <div className="confidence-badge">
            <span className="confidence-percentage">{confidence}%</span>
            <span className="confidence-label">Confianza</span>
          </div>
          
          <h3 className="plant-name">{plant.name}</h3>
          <p className="plant-common-name">{plant.commonName}</p>
          
          <div className="plant-details">
            <div className="detail-item">
              <strong>👨‍👩‍👧‍👦 Familia:</strong> {plant.family}
            </div>
            <div className="detail-item">
              <strong>🌍 Origen:</strong> {plant.origin}
            </div>
          </div>
        </div>
      </div>

      {alternatives && alternatives.length > 0 && (
        <div className="alternatives">
          <h4>🔍 Alternativas Encontradas</h4>
          <div className="alternatives-grid">
            {alternatives.map((alt, index) => (
              <div key={index} className="alternative-card">
                <div className="alt-confidence">{alt.confidence}%</div>
                <p className="alt-name">{alt.plant.name}</p>
                <p className="alt-common">{alt.plant.commonName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
