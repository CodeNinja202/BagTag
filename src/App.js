import React, { useState, useRef, useEffect } from "react";
import RankingTable from "./components/Rankingtable";

import EditPlayerForm from "./components/EditPlayerForm";
import { getAllTagPlayers, deleteTagPlayer } from "./components/api";

const baseURL = 'http://localhost:3001/api'

const App = () => {
  const formRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);


  const updateRankings = (players, player, bagTag) => {
    // Make a copy of the players array so we don't modify the original
    const updatedPlayers = [...players];

    // Check if there is already a player in the array with the same name and bag tag
    const duplicatePlayer = updatedPlayers.find(
      (p) => p.name === player.name && p.bagTag === bagTag
    );

    // If there is a duplicate player, return the original players array
    if (duplicatePlayer) {
      return players;
    }

    // Find the index of the player in the array
    const playerIndex = updatedPlayers.findIndex((p) => p.name === player.name);

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

  const onRoundSubmit = async (event, player) => {
    const newBagTag = parseInt(event.target.bagTag.value);
    const updatedPlayer = {
      ...player,
      bagTag: newBagTag,
    };
    await updateBagTag(player.id, updatedPlayer);
    const updatedPlayers = await fetchAllTagPLayers();
    setPlayers(updatedPlayers);
  };
  

  const onAddPlayer = (event, formRef) => {
    event.preventDefault();
    const name = event.target.name.value;
    const bagTag = parseInt(event.target.bagTag.value, 10);
  
    if (!name || !bagTag) {
      console.error("Name and bag tag fields cannot be empty");
      return;
    }
  
    if (players.some((player) => player.name === name)) {
      console.error(`Player with name '${name}' already exists`);
      return;
    }
    if (players.some((player) => player.bagTag === bagTag)) {
      console.error(`Player with name '${bagTag}' already exists`);
      return;
    }
  
    try {
      const newPlayer = { name, bagTag };
      fetch(`${baseURL}/bagtag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer),
      })
        .then((response) => response.json())
        .then((player) => {
          const updatedPlayers = updateRankings(players, player, 0);
          setPlayers(updatedPlayers);
          formRef.current.reset();
        });
    } catch (error) {
      console.error(error);
    }
  };
  

  const onDeletePlayer = (player) => {
    deleteTagPlayer(player.id).then(() => {
      // Remove the player from the state
      setPlayers(players.filter(p => p.id !== player.id));
    });
  }



  
  
  

  async function fetchAllTagPLayers() {
    const results = await getAllTagPlayers();
    setPlayers(results);
  }




//USE EFFECT START
  useEffect(() => {
    fetchAllTagPLayers();
  }, []);

  return (
    <div>

<div>
      {players.map(player => {
        if (player.id === editingPlayer) {
          return <EditPlayerForm player={player} onEditPlayer={onEditPlayer} />;
        }

        return (
          <div key={player.id}>
            {player.name} - Bag Tag: {player.bagTag}
            <button onClick={() => setEditingPlayer(player.id)}>Edit</button>
          </div>
        );
      })}
    </div>

      <RankingTable
        players={players}
        fetchAllTagPLayers={fetchAllTagPLayers}
        onRoundSubmit={onRoundSubmit}
        onDeletePlayer={onDeletePlayer}
 
      />
      <form ref={formRef} onSubmit={(event) => onAddPlayer(event, formRef)}>
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
