import React, { useEffect, useState, useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg
} from '@ionic/react';

import './PackPage.css';
import ObjectDetail from '../components/ObjectDetails';
import { MenuPokedexContext, EPokedexMenuOption, EPokedexScreen } from '../contexts/MenuPokedexContext';

const PackPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedObjectDetail, setSelectedObjectDetail] = useState<any | null>(null);

  const { setScreen, setMenuOption } = useContext(MenuPokedexContext);

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
      if (selectedObjectDetail) {
        document.getElementById("object-detail")?.scrollBy({ top: -50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      }
    };

    const handleDown = () => {
      if (selectedObjectDetail) {
        document.getElementById("object-detail")?.scrollBy({ top: 50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }
    };

    const handleSelect = async () => {
      if (selectedObjectDetail) return;
      const item = items[selectedIndex];
      try {
        const res = await fetch(item.url);
        const data = await res.json();
        const effect = data.effect_entries.find((entry: any) => entry.language.name === 'en')?.short_effect || 'No description available.';

        setSelectedObjectDetail({
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`,
          effect,
          cost: data.cost || 0,
          category: data.category?.name || 'unknown',
        });
        setScreen(EPokedexScreen.PACK);
      } catch (error) {
        console.error("Error fetching item details", error);
      }
    };

    const handleBack = () => {
      if (selectedObjectDetail) {
        setSelectedObjectDetail(null);
        setScreen(EPokedexScreen.PACK);
      } else {
        setScreen(EPokedexScreen.MENU);
        setMenuOption(EPokedexMenuOption.PACK);
        window.location.href = '/home';
      }
    };

    window.addEventListener('cross-up', handleUp);
    window.addEventListener('cross-down', handleDown);
    window.addEventListener('cross-select', handleSelect);
    window.addEventListener('cross-back', handleBack);

    return () => {
      window.removeEventListener('cross-up', handleUp);
      window.removeEventListener('cross-down', handleDown);
      window.removeEventListener('cross-select', handleSelect);
      window.removeEventListener('cross-back', handleBack);
    };
  }, [items, selectedIndex, selectedObjectDetail, setScreen, setMenuOption]);

  useEffect(() => {
    const selectedItem = document.getElementById(`item-${selectedIndex}`);
    selectedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  if (selectedObjectDetail) {
    return (
      <div id="object-detail" className="object-detail-screen hide-scrollbar" style={{ overflowY: 'auto', height: '100%' }}>
        <ObjectDetail
          name={selectedObjectDetail.name}
          image={selectedObjectDetail.image}
          effect={selectedObjectDetail.effect}
          cost={selectedObjectDetail.cost}
          category={selectedObjectDetail.category}
          onBack={() => setSelectedObjectDetail(null)}
        />
      </div>
    );
  }

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
