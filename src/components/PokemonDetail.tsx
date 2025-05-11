import React from 'react';

interface PokemonDetailProps {
  name: string;
  image: string;
  stats: { name: string; value: number }[];
  onBack: () => void;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ name, image, stats, onBack }) => {
  return (
    <div className="pokemon-detail-screen">
      <div className="detail-image-container">
        <img src={image} alt={name} />
      </div>
      <div className="detail-info">
        <h3>{name}</h3>
        <ul>
          {stats.map((s, i) => (
            <li key={i}>
              <strong>{s.name}:</strong> {s.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="back-button" onClick={onBack}>⟵ Regresar</div>
    </div>
  );
};

export default PokemonDetail;
