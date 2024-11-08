// Characterlist.tsx
import { useState, useEffect } from 'react';
import Character from './Character';
import NavPage from '../NavPage';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
}

function Characterlist() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }

    fetchData();
  }, [page]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />

      <div className="row">
        {characters.map((character) => {
          return (
            <div className="col-md-4 p-5">
              <Character character={character} key={character.id} />
            </div>
          );
        })}
      </div>

      <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default Characterlist;