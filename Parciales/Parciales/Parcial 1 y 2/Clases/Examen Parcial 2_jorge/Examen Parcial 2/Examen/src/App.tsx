import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; 
import CharacterList from './CharacterList';
import LocationsSlideshow from './LocationsSlideshow'; 
import DescriptionPage from './DescriptionPage';  // Importamos el nuevo componente

import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Ruta principal para personajes */}
            <Route path="/" element={
              <>
                <h1 id="characters">Personajes</h1>
                <CharacterList />
              </>
            } />

            {/* Ruta para el slideshow de locaciones */}
            <Route path="/locations" element={<LocationsSlideshow />} />

            {/* Ruta para la nueva página de descripción */}
            <Route path="/description" element={<DescriptionPage />} /> {/* Nueva ruta */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;