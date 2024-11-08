import React, { useState, useEffect } from 'react';
import './style/LocationsSlideshow.css'
import './style/index.css'


interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  created: string;
}

const locations: Location[] = [
  {
    id: 1,
    name: 'Earth (C-137)',
    dimension: 'Dimension C-137',
    type: 'Planet',
    created: '2017-11-10',
  },
  {
    id: 2,
    name: 'Gazorpazorp',
    dimension: 'Dimension D-99',
    type: 'Planet',
    created: '2018-01-13',
  },
  {
    id: 3,
    name: 'Bird World',
    dimension: 'Dimension B-33',
    type: 'Planet',
    created: '2017-12-23',
  },
];

const LocationsSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        <p>
          <strong>Creado:</strong> {locations[currentIndex].created}
        </p>
        <p>
          <strong>Dimensión:</strong> {locations[currentIndex].dimension}
 </p>
        <p>
          <strong>Tipo:</strong> {locations[currentIndex].type}
        </p>
      </div>

      <div className="slideshow-controls">
        <button onClick={handlePrev} className="prev-btn">
          &#8249;
        </button>
        <button onClick={handleNext} className="next-btn">
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default LocationsSlideshow;