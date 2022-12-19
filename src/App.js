import React, { useState, useRef } from 'react';
import RankingTable from './components/Rankingtable';

const App = () => {
  const formRef = useRef(null);
  const [players, setPlayers] = useState([
    {name: 'Alice', bagTag: 1},
    {name: 'Bob', bagTag: 2},
    {name: 'Charlie', bagTag: 3},
  ]);
  const updateRankings = (players, player, bagTag) => {
   
    // Make a copy of the players array so we don't modify the original
    const updatedPlayers = [...players];
  
    // Check if there is already a player in the array with the same name and bag tag
    const duplicatePlayer = updatedPlayers.find(p => p.name === player.name && p.bagTag === bagTag);
  
    // If there is a duplicate player, return the original players array
    if (duplicatePlayer) {
      return players;
    }
  
    // Find the index of the player in the array
    const playerIndex = updatedPlayers.findIndex(p => p.name === player.name);
  
    // If the player is not in the array, add them to the end
    if (playerIndex === -1) {
      updatedPlayers.push(player);
    } else {
      // Otherwise, update the player's bag tag
      updatedPlayers[playerIndex] = {
        ...player,
        bagTag,
      };
    }
  
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
  

  const onAddPlayer = (event, formRef) => {
    event.preventDefault();
    const name = event.target.name.value;
    const bagTag = parseInt(event.target.bagTag.value, 10); // parse bagTag as integer
  
    try {
      const newPlayer = { name, bagTag };
      const updatedPlayers = updateRankings(players, newPlayer, 0);
      setPlayers(updatedPlayers);
  
      // Reset the form after the player is added
      formRef.current.reset();
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div>
      <RankingTable players={players} onRoundSubmit={onRoundSubmit} />
      <form ref={formRef} onSubmit={event => onAddPlayer(event, formRef)}>
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
