import React, { useEffect, useState, useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg
} from '@ionic/react';

import './PackPage.css';
import { MenuPokedexContext, EPokedexScreen, EPokedexMenuOption } from '../contexts/MenuPokedexContext';
import ObjectDetail from '../components/ObjectDetails';

const PackPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItemDetail, setSelectedItemDetail] = useState<any | null>(null);

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
      if (selectedItemDetail) {
        document.getElementById("item-detail")?.scrollBy({ top: -50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      }
    };

    const handleDown = () => {
      if (selectedItemDetail) {
        document.getElementById("item-detail")?.scrollBy({ top: 50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }
    };

    const handleSelect = async () => {
      if (selectedItemDetail) return;
      const item = items[selectedIndex];
      try {
        const res = await fetch(item.url);
        const data = await res.json();
        const effect = data.effect_entries?.find((e: any) => e.language.name === 'en')?.short_effect || 'No description available.';
        setSelectedItemDetail({
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`,
          effect
        });
        setScreen(EPokedexScreen.POKEMON_DETAIL);
      } catch (e) {
        console.error("Error loading item details", e);
      }
    };

    const handleBack = () => {
      if (selectedItemDetail) {
        setSelectedItemDetail(null);
        setScreen(EPokedexScreen.PACK);
      } else {
        setMenuOption(EPokedexMenuOption.PACK);
        setScreen(EPokedexScreen.MENU);
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
  }, [items, selectedIndex, selectedItemDetail, setScreen, setMenuOption]);

  useEffect(() => {
    const selectedItem = document.getElementById(`item-${selectedIndex}`);
    selectedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  if (selectedItemDetail) {
    return (
      <div
         id="pokemon-detail"
              className="object-detail-screen"
              style={{ overflowY: 'auto', height: '100%' }}
            >
              <ObjectDetail
                name={selectedItemDetail.name}
                image={selectedItemDetail.image}
                effect={selectedItemDetail.effect}
                onBack={() => {
                  setSelectedItemDetail(null);
                  setScreen(EPokedexScreen.PACK);
                }}
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
