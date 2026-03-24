import React, { useState } from "react";

export default function PokemonCard({ pokemon }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  // Allowed games
  const allowedGames = [
    "firered",
    "leafgreen",
    "lets-go-pikachu",
    "lets-go-eevee",
    "sword",
    "shield",
    "brilliant-diamond",
    "shining-pearl",
    "legends-arceus",
    "scarlet",
    "violet",
  ];

  // Filter games
  const filteredGames = pokemon.games.filter((game) =>
    allowedGames.includes(game)
  );

  return (
    <div
      onClick={handleClick}
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "180px",
        cursor: "pointer",
        backgroundColor: selected ? "#90ee90" : "white",
        transition: "background-color 0.2s ease",
      }}
    >
      <img src={pokemon.sprite} alt={pokemon.name} />
      <h3>{pokemon.name.toUpperCase()}</h3>
      <p>Pokédex No. {pokemon.id}</p>

      <p>Games:</p>
      <ul>
        {filteredGames.length > 0 ? (
          filteredGames.map((game, i) => <li key={i}>{game}</li>)
        ) : (
          <li>Not available in selected games</li>
        )}
      </ul>
    </div>
  );
}