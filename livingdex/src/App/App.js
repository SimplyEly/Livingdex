// App.js
import React, { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1025",
        );
        const data = await res.json();

        // Fetch details for each Pokémon
        const details = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(poke.url);
            const info = await res.json();
            return {
              id: info.id,
              name: info.name,
              sprite: info.sprites.front_default,
              games: info.game_indices.map((g) => g.version.name),
            };
          }),
        );

        setPokemonList(details);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemonList();
  }, []);

  if (loading) return <div>Loading Pokémon...</div>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {pokemonList.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} />
      ))}
    </div>
  );
}
