import React, { useEffect, useState } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg
} from '@ionic/react';

import './PokedexPage.css';
import PokemonDetail from '../components/PokemonDetail';

const getIdFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const PokedexPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPokemonDetail, setSelectedPokemonDetail] = useState<any | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      setPokemons(data.results);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const handleUp = () => {
      if (selectedPokemonDetail) {
        document.getElementById("pokemon-detail")?.scrollBy({ top: -50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === 0 ? pokemons.length - 1 : prev - 1));
      }
    };

    const handleDown = () => {
      if (selectedPokemonDetail) {
        document.getElementById("pokemon-detail")?.scrollBy({ top: 50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === pokemons.length - 1 ? 0 : prev + 1));
      }
    };

    const handleSelect = async () => {
      if (selectedPokemonDetail) return;
      const selected = pokemons[selectedIndex];
      try {
        const res = await fetch(selected.url);
        const data = await res.json();
        const stats = data.stats.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat
        }));

        setSelectedPokemonDetail({
          name: selected.name,
          image: data.sprites.front_default,
          stats
        });
      } catch (error) {
        console.error("Error al obtener detalles del Pokémon", error);
      }
    };

    const handleBack = () => {
      setSelectedPokemonDetail(null);
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
  }, [pokemons, selectedIndex, selectedPokemonDetail]);

  useEffect(() => {
    const selected = document.getElementById(`pokemon-${selectedIndex}`);
    selected?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedIndex]);

  if (selectedPokemonDetail) {
    return (
      <PokemonDetail
        name={selectedPokemonDetail.name}
        image={selectedPokemonDetail.image}
        stats={selectedPokemonDetail.stats}
        onBack={() => setSelectedPokemonDetail(null)}
      />
    );
  }

  return (
    <div className="pokemon-list-container hide-scrollbar">
      <IonList className="pokemon-list">
        {pokemons.map((pokemon, index) => {
          const id = getIdFromUrl(pokemon.url);
          return (
            <IonItem
              key={pokemon.name}
              id={`pokemon-${index}`}
              className={`pokemon-item ${selectedIndex === index ? 'selected-item' : ''}`}
              lines="none"
            >
              <IonThumbnail slot="start">
                <IonImg
                  className="pokemon-image float-image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                />
              </IonThumbnail>
              <IonLabel className="pokemon-label">{pokemon.name}</IonLabel>
            </IonItem>
          );
        })}
      </IonList>
    </div>
  );
};

export default PokedexPage;
