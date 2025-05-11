import React from 'react';
import './ObjectDetails.css';

interface ObjectDetailProps {
  name: string;
  image: string;
  effect: string;
  cost: number;
  category: string;
  onBack: () => void;
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({ name, image, effect, cost, category }) => {
  return (
    <div className="object-detail-screen hide-scrollbar">
      <div className="detail-image-container">
        <img src={image} alt={name} className="object-detail-image" />
      </div>
      <div className="detail-info">
        <h3>{name}</h3>
        <ul>
          <li><strong>Effect:</strong> <span>{effect}</span></li>
          <li><strong>Cost:</strong> <span>{cost}</span></li>
          <li><strong>Category:</strong> <span>{category}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default ObjectDetail;
