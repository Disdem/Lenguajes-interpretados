interface CharacterProps {
  character: {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    origin: { name: string };
  };
}

function Character({ character }: CharacterProps) {
  return (
    <div className="Cartas1">
      <div className="">
        <h3>{character.name}</h3>
        <hr />
        <h2>status: </h2>
        <h3>{character.status}</h3>
        <h2>Specie:</h2>
        <h3>{character.species}</h3>
        <h2>Gender:</h2>
        <h3>{character.gender}</h3>
        <img className="imagen" src={character.image} alt={character.name} />
        <p>{character.origin.name}</p>
      </div>
    </div>
  );
}

export default Character;