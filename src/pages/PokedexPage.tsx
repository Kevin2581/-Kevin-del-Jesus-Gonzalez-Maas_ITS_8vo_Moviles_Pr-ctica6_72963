import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonThumbnail, IonImg, useIonAlert } from '@ionic/react';

const PokedexPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      setPokemons(data.results);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const handleUp = () => setSelectedIndex((prev) => (prev === 0 ? pokemons.length - 1 : prev - 1));
    const handleDown = () => setSelectedIndex((prev) => (prev === pokemons.length - 1 ? 0 : prev + 1));
    const handleSelect = async () => {
      const pokemon = pokemons[selectedIndex];
      const res = await fetch(pokemon.url);
      const data = await res.json();
      presentAlert({
        header: pokemon.name,
        message: `Height: ${data.height}, Weight: ${data.weight}`,
        buttons: ['Ok'],
        cssClass: 'custom-alert',
      });
    };

    window.addEventListener('cross-up', handleUp);
    window.addEventListener('cross-down', handleDown);
    window.addEventListener('cross-select', handleSelect);

    return () => {
      window.removeEventListener('cross-up', handleUp);
      window.removeEventListener('cross-down', handleDown);
      window.removeEventListener('cross-select', handleSelect);
    };
  }, [pokemons, selectedIndex, presentAlert]);

  useEffect(() => {
    const selectedItem = document.getElementById(`pokemon-item-${selectedIndex}`);
    selectedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        fontFamily: 'Pokemon GB',
        fontSize: '12px',
        color: '#003300',
        paddingRight: '4px'
      }}
    >
      <IonList style={{ background: 'transparent' }}>
        {pokemons.map((pokemon, index) => (
          <IonItem
            key={index}
            id={`pokemon-item-${index}`}
            style={{
              backgroundColor: index === selectedIndex ? '#b0ffb0' : 'transparent',
              fontWeight: index === selectedIndex ? 'bold' : 'normal',
              padding: '4px 0',
            }}
          >
            <IonThumbnail slot="start" style={{ width: '40px', height: '40px' }}>
              <IonImg
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              />
            </IonThumbnail>
            <IonLabel style={{ textTransform: 'capitalize' }}>{pokemon.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default PokedexPage;
