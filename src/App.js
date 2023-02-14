import React, { useState, useRef, useEffect } from "react";
import RankingTable from "./components/Rankingtable";
import { getAllTagPlayers, deleteTagPlayer, updateBagTag } from "./components/api";
const baseURL = 'http://localhost:3001/api'

const App = () => {
  const formRef = useRef(null);
  const [players, setPlayers] = useState([]);
 

//update the ranking table//////////////////////////////////
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




//submit new bag tag to the server/////////////////////////
  const onRoundSubmit = async (event, player) => {
  
    const newBagTag = parseInt(event.target.bagTag.value);

     // Check if the new bagTag already exists in the list of players
     if (players.some((player) => player.newBagTag === bagTag)) {
      console.error(`Player with name '${newBagTag}' already exists`);
      return;
    }

    const updatedPlayer = {
      ...player,
      bagTag: newBagTag,
    };
    await updateBagTag(player.id, updatedPlayer);
    const updatedPlayers = await fetchAllTagPLayers();
    setPlayers(updatedPlayers);
  };
  
////////////////////////////////////////////////////////



// Adds new player/////////////////////////////////////
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
  
////////////////////////////////////////////////////////////////


// Deletes a player from the list of players///////////////////////
  const onDeletePlayer = (player) => {
    deleteTagPlayer(player.id).then(() => {
      // Remove the player from the state
      setPlayers(players.filter(p => p.id !== player.id));
    });
  }

////////////////////////////////////////////////////////////




// Fetchs all players/////////////////////////////////////
  async function fetchAllTagPLayers() {
    const results = await getAllTagPlayers();
    setPlayers(results);
  }
////////////////////////////////////////////////////////////




//USE EFFECT START
  useEffect(() => {
    fetchAllTagPLayers();
  }, []);

  return (
    <div>
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

