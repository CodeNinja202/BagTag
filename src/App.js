import React, { useState } from 'react';
import RankingTable from './components/Rankingtable';

const App = () => {
  const [players, setPlayers] = useState([
    {name: 'Alice', bagTag: 1},
    {name: 'Bob', bagTag: 2},
    {name: 'Charlie', bagTag: 3},
  ]);

  const updateRankings = (players, player, bagTag) => {
    // Make a copy of the players array so we don't modify the original
    const updatedPlayers = [...players];
  
    // Find the index of the player in the array
    const playerIndex = updatedPlayers.findIndex(p => p.name === player.name);
  
    // Update the player's bag tag
    updatedPlayers[playerIndex] = {
      ...player,
      bagTag,
    };
  
    // Sort the players by bag tag
    updatedPlayers.sort((a, b) => a.bagTag - b.bagTag);
  
    return updatedPlayers;
  };
  

  const onRoundSubmit = (event, player) => {
    event.preventDefault();
    const bagTag = event.target.bagTag.value; // access bagTag value from form
  
    const updatedPlayers = updateRankings(players, player, bagTag);
    setPlayers(updatedPlayers);
  };
  

  const onAddPlayer = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const bagTag = parseInt(event.target.bagTag.value, 10); // parse bagTag as integer
  
    try {
      const newPlayer = { name, bagTag };
      const updatedPlayers = updateRankings(players, newPlayer, 0);
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <RankingTable players={players} onRoundSubmit={onRoundSubmit} />
      <form onSubmit={event => onAddPlayer(event)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="bagTag">Bag Tag:</label>
        <input type="number" id="bagTag" name="bagTag" />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default App;
