import React, { useState } from 'react';
import '../styles/ImageUpload.css';

export const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        setFileName(file.name);
        onImageUpload(file, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload">
      <h2>🌱 Subir Foto de la Planta</h2>
      <div className="upload-box">
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Vista previa" className="preview-image" />
            <p className="file-name">{fileName}</p>
            <label htmlFor="file-input" className="upload-button change-image">
              Cambiar Imagen
            </label>
          </div>
        ) : (
          <div className="upload-placeholder">
            <p className="upload-icon">☁️</p>
            <p>Sube tu foto aquí</p>
            <label htmlFor="file-input" className="upload-button">
              Seleccionar Imagen
            </label>
          </div>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};
