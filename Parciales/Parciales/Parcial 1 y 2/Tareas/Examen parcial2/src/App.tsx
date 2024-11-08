import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCards from './CreateCards';
import DescriptionPage from './DescriptionPage';
import LocationsSlideshow from './LocationsSlideshow';
import './style/index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateCards />} />
        <Route path="/description" element={<DescriptionPage />} />
        <Route path="/location" element={<LocationsSlideshow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;