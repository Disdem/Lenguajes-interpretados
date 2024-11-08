import React from 'react';
import './styles/DescriptionPage.css';  // Agregamos un archivo CSS para estilos personalizados

const DescriptionPage: React.FC = () => {
  return (
    <div className="description-container">
      <h2>Descripción de Rick and Morty</h2>
      
      {/* Imagen centrada */}
      <div className="centered-image">
        <img src="Rick and Morty logo" alt="Rick and Morty" />
      </div>

      <p>
        <strong>Rick and Morty</strong> es una serie animada de ciencia ficción y comedia creada por Justin Roiland y Dan Harmon. La trama sigue las desventuras de un científico loco, Rick Sánchez, y su nieto, Morty Smith, quienes se embarcan en viajes interdimensionales y aventuras que desafían la lógica y las leyes del universo. La serie se caracteriza por su humor oscuro, referencias a la cultura pop, y temas filosóficos y existenciales.
      </p>

      {/* Imagen a la izquierda con texto a la derecha */}
      <div className="image-text-row">
        <div className="image-container">
          <img src="ruta-a-la-imagen.jpg" alt="Rick y Morty" />
        </div>
        <div className="text-container">
          <h3>Temas principales</h3>
          <ul>
            <li>Aventuras interdimensionales</li>
            <li>Exploración de realidades alternativas</li>
            <li>Relaciones familiares complicadas</li>
            <li>Humor negro y sátira social</li>
          </ul>
        </div>
      </div>

      <h3>Personajes principales</h3>
      <p>
        Los personajes principales de la serie son:
      </p>
      <ul>
        <li><strong>Rick Sánchez</strong>: Un científico brillante pero alcohólico y cínico.</li>
        <li><strong>Morty Smith</strong>: El nieto de Rick, quien a menudo se ve arrastrado a las aventuras de su abuelo.</li>
        <li><strong>Summer Smith</strong>: La hermana mayor de Morty.</li>
        <li><strong>Beth Smith</strong>: La madre de Morty y la hija de Rick.</li>
        <li><strong>Jerry Smith</strong>: El padre de Morty, inseguro y a menudo incapaz.</li>
      </ul>
    </div>
  );
};

export default DescriptionPage;