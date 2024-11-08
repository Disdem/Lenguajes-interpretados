import React from 'react';

interface CharacterCardProps {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, status, species, gender, image }) => {
  return (
    <div className="character-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Status: {status}</p>
      <p>Species: {species}</p>
      <p>Gender: {gender}</p>
    </div>
  );
};

export default CharacterCard;