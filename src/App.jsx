import React, { useState } from 'react'
import { ImageUpload } from './components/ImageUpload'
import { IdentificationResults } from './components/IdentificationResults'
import { PlantCare } from './components/PlantCare'
import { PlantHistory } from './components/PlantHistory'
import { simulatePlantIdentification } from './data/identificationSimulator'
import './styles/App.css'

function App() {
  const [preview, setPreview] = useState(null)
  const [identification, setIdentification] = useState(null)

  const handleImageUpload = (file, imagePreview) => {
    setPreview(imagePreview)
    
    // Simulate plant identification
    const result = simulatePlantIdentification(file)
    setIdentification(result)
  }

  const primaryPlant = identification?.primary?.plant

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌸 Identifica Tu Planta</h1>
        <p>Sube una foto de una planta y descubre todo sobre ella.</p>
      </header>

      <div className="app-container">
        <div className="top-section">
          <div className="column upload-column">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>

          <div className="column results-column">
            <IdentificationResults 
              preview={preview} 
              identification={identification} 
            />
          </div>

          <div className="column care-column">
            <PlantCare plant={primaryPlant} />
          </div>
        </div>

        <div className="bottom-section">
          <PlantHistory plant={primaryPlant} />
        </div>
      </div>
    </div>
  )
}

export default App
