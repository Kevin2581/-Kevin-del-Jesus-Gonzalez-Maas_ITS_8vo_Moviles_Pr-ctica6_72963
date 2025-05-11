import React from 'react';
import './ObjectDetails.css';

interface ObjectDetailProps {
  name: string;
  image: string;
  effect: string;
  onBack: () => void;
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({ name, image, effect, onBack }) => {
  return (
    <div className="object-detail-screen">
      <div className="detail-image-container">
        <img src={image} alt={name} className="object-detail-image" />
      </div>
      <div className="detail-info">
        <h3>{name}</h3>
        <p>{effect}</p>
      </div>
      <div className="back-button" onClick={onBack}>⟵ Regresar</div>
    </div>
  );
};

export default ObjectDetail;
