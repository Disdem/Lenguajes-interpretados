import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Characterlist from './components/Characterlist';
import DescriptionPage from './DescriptionPage';
import LocationsSlideshow from './LocationsSlideshow';
import './style/index.css'


function CreateCards() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h5>
          <Link to="/">Personajes</Link>
        </h5>
        <h5>
          <Link to="/description">Descripcion</Link>
        </h5>
        <h5>
          <Link to="/locationSlideshow">Locations</Link>
        </h5>
      </nav>
      <h1 id="titulo">Rick and Morty</h1>
      <Routes>
        <Route path="/" element={<Characterlist />} />
        <Route path="/description" element={<DescriptionPage />} />
        <Route path="/locationSlideshow" element={<LocationsSlideshow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CreateCards;