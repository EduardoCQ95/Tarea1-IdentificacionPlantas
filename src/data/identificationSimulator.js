import { plantsData } from './plantsData';

/**
 * Simulates plant identification based on file properties
 * Returns primary plant match and alternative suggestions
 */
export const simulatePlantIdentification = (file) => {
  // Create a deterministic hash from file properties
  const fileHash = hashFile(file);
  
  // Select primary plant based on file hash
  const primaryPlantIndex = fileHash % plantsData.length;
  const primaryPlant = plantsData[primaryPlantIndex];
  
  // Generate confidence (80-98%)
  const confidence = Math.floor(80 + (fileHash % 19));
  
  // Find alternative plants from same or similar category
  const alternatives = getAlternativePlants(primaryPlantIndex, fileHash);
  
  return {
    primary: {
      plant: primaryPlant,
      confidence: confidence
    },
    alternatives: alternatives.map((plant, index) => ({
      plant: plant,
      confidence: Math.max(30, confidence - 15 - (index * 10))
    }))
  };
};

/**
 * Creates a simple hash from file properties
 */
const hashFile = (file) => {
  const name = file.name || '';
  const size = file.size || 0;
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  hash = Math.abs(hash + size);
  return hash;
};

/**
 * Gets 2-3 alternative plants similar to the primary
 */
const getAlternativePlants = (primaryIndex, fileHash) => {
  const primaryPlant = plantsData[primaryIndex];
  const primaryCategory = primaryPlant.category;
  
  // Find plants with same or similar category
  const sameCategory = plantsData.filter(
    (plant, index) => 
      index !== primaryIndex && plant.category === primaryCategory
  );
  
  // If not enough in same category, add from other categories
  let alternatives = [...sameCategory];
  if (alternatives.length < 3) {
    const other = plantsData.filter(
      (plant, index) => 
        index !== primaryIndex && plant.category !== primaryCategory
    );
    alternatives = [...alternatives, ...other];
  }
  
  // Shuffle and select top 3 based on file hash
  alternatives = shuffleArray(alternatives, fileHash).slice(0, 3);
  
  return alternatives;
};

/**
 * Shuffle array deterministically based on seed
 */
const shuffleArray = (array, seed) => {
  const shuffled = [...array];
  let random = seed;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    random = (random * 9301 + 49297) % 233280;
    const j = Math.floor((random / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};
