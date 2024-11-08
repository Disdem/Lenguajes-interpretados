import React, { useEffect, useState } from 'react';
import { getCharacters } from './services/api';
import CharacterCard from './CharacterCard';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1); // Estado para manejar la paginación

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharacters(page); // Pasar la página como argumento
      setCharacters(result);
    };

    fetchData();
  }, [page]); // Volver a ejecutar el efecto cuando la página cambie

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Ir a la siguiente página
  };

  const handleRestart = () => {
    setPage(1); // Reiniciar a la primera página
  };

  return (
    <div className="character-list-container">
      <div className="character-list">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            image={character.image}
          />
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={handleRestart}>Reinicio</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </div>
  );
};

export default CharacterList;