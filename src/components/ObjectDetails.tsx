import React from 'react';
import './ObjectDetails.css';

interface ObjectDetailProps {
  name: string;
  localizedName?: string;
  image: string;
  cost: number;
  flavorText?: string;
  category: string;
  localizedCategory?: string;
  attributes?: string[];
  isDiscardable?: boolean;
  isConsumable?: boolean;
  flingEffect?: string;
  flingPower?: number;
  onBack: () => void;
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({
  name,
  localizedName,
  image,
  cost,
  flavorText,
  category,
  localizedCategory,
  attributes,
  isDiscardable,
  isConsumable,
  flingEffect,
  flingPower,
  onBack
}) => {
  return (
    <div className="object-detail-screen hide-scrollbar">
      <div className="detail-image-container">
        <img src={image} alt={name} className="object-detail-image" />
      </div>
      <div className="detail-info">
        <h3>{localizedName || name}</h3>
        <ul>
          {flavorText && <li><strong>Descripción:</strong> <span>{flavorText}</span></li>}
          <li><strong>Costo:</strong> <span>{cost} 🪙</span></li>
          <li><strong>Categoría:</strong> <span>{localizedCategory || category}</span></li>
          {attributes && attributes.length > 0 && (
            <li><strong>Atributos:</strong> <span>{attributes.join(', ')}</span></li>
          )}
          {flingEffect && <li><strong>Efecto de Lanzamiento:</strong> <span>{flingEffect}</span></li>}
          {flingPower !== undefined && <li><strong>Poder de Lanzamiento:</strong> <span>{flingPower}</span></li>}
          {isDiscardable !== undefined && <li><strong>Descartable:</strong> <span>{isDiscardable ? 'Sí' : 'No'}</span></li>}
          {isConsumable !== undefined && <li><strong>Consumible:</strong> <span>{isConsumable ? 'Sí' : 'No'}</span></li>}
        </ul>
      </div>
    </div>
  );
};

export default ObjectDetail;
