import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  useIonAlert
} from '@ionic/react';

import './PackPage.css';

const PackPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/item?limit=50');
      const data = await response.json();
      setItems(data.results);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const handleUp = () => {
      setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const handleDown = () => {
      setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const handleSelect = async () => {
      const item = items[selectedIndex];
      try {
        const res = await fetch(item.url);
        const data = await res.json();
        presentAlert({
          header: item.name,
          message: data.effect_entries?.find((entry) => entry.language.name === 'en')?.short_effect || 'No description available.',
          buttons: ['OK'],
        });
      } catch (e) {
        console.error("Failed to fetch item details", e);
      }
    };

    window.addEventListener('cross-up', handleUp);
    window.addEventListener('cross-down', handleDown);
    window.addEventListener('cross-select', handleSelect);

    return () => {
      window.removeEventListener('cross-up', handleUp);
      window.removeEventListener('cross-down', handleDown);
      window.removeEventListener('cross-select', handleSelect);
    };
  }, [items, selectedIndex, presentAlert]);

  useEffect(() => {
    const selectedItem = document.getElementById(`item-${selectedIndex}`);
    selectedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  return (
    <div
      className="hide-scrollbar"
      style={{
        height: '100%',
        fontFamily: 'Pokemon GB',
        fontSize: '12px',
        color: '#003300',
        paddingRight: '4px'
      }}
    >
      <IonList style={{ background: 'transparent' }}>
        {items.map((item, index) => (
          <IonItem
            key={index}
            id={`item-${index}`}
            lines="none"
            className={`item-entry ${index === selectedIndex ? 'selected-entry' : ''}`}
          >
            <IonThumbnail slot="start" style={{ width: '40px', height: '40px' }}>
              <IonImg
                className="item-image float-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                alt={item.name}
              />
            </IonThumbnail>
            <IonLabel className="item-label">{item.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default PackPage;
