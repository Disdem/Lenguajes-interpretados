import React, { useEffect, useState } from 'react';
import './styles/LocationsSlideshow.css';

interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  created: string;
}

const locations: Location[] = [
  // Ejemplo de locaciones (puedes obtener estos datos de una API o archivo estático)
  { id: 1, name: 'Earth (C-137)', dimension: 'Dimension C-137', type: 'Planet', created: '2017-11-10' },
  { id: 2, name: 'Gazorpazorp', dimension: 'Dimension D-99', type: 'Planet', created: '2018-01-13' },
  { id: 3, name: 'Bird World', dimension: 'Dimension B-33', type: 'Planet', created: '2017-12-23' },
  // Agrega más locaciones aquí
];

const LocationsSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar slide automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cambiar slide manualmente
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + locations.length) % locations.length);
  };

  return (
    <div className="slideshow-container">
      <div className="location-slide">
        <h2>{locations[currentIndex].name}</h2>
        <p><strong>Creado:</strong> {locations[currentIndex].created}</p>
        <p><strong>Dimensión:</strong> {locations[currentIndex].dimension}</p>
        <p><strong>Tipo:</strong> {locations[currentIndex].type}</p>
      </div>

      <div className="slideshow-controls">
        <button onClick={handlePrev} className="prev-btn">&#8249;</button>
        <button onClick={handleNext} className="next-btn">&#8250;</button>
      </div>
    </div>
  );
};

export default LocationsSlideshow;