import React, { useState, useRef, useEffect, formRef } from "react";

import "./index.css";
import RankingTable from "./components/Rankingtable";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  getAllTagPlayers,
  deleteTagPlayer,
  updateBagTag,
  getAllUsers,
  getUserDetails,
} from "./components/api";
const baseURL = 'https://bag-tag.onrender.com/api';

const App = () => {

  const [players, setPlayers] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();



  async function getMe() {
    const storedToken = window.localStorage.getItem("token");
    if (!token) {
      if (storedToken) {
        setToken(storedToken);
      }
      return;
    }

    const results = await getUserDetails(token);
   console.log(token)
    if (results) {
      setUser(results);
      setUsername(results.username);
      setUserId(results.id);
    } else {
      console.log("error getting user results in the getMe function");
    }
  }
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
    event.preventDefault();
    const newBagTag = parseInt(event.target.bagTag.value);
  
    // Check if the new bagTag already exists in the list of players
    if (players.some((player) => player.newBagTag === bagTag)) {
      console.error(`Player with name '${newBagTag}' already exists`);
      return;
    }
  
    // Update the player object in the local state
    const updatedPlayers = players.map((p) => {
      if (p.id === player.id) {
        return {
          ...p,
          bagTag: newBagTag,
        };
      }
      return p;
    });
    setPlayers(updatedPlayers);
  
    // Update the player object in the database
    const updatedPlayer = {
      ...player,
      bagTag: newBagTag,
    };
    await updateBagTag(player.id, updatedPlayer);
  };
  

  ////////////////////////////////////////////////////////

  // Adds new player/////////////////////////////////////
  const onAddPlayer = async (event) => {
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlayer),
      })
        .then((response) => response.json())
        .then((player) => {
          const updatedPlayers = updateRankings(players, player, 0);
          setPlayers(updatedPlayers);
          event.target.reset()
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
      setPlayers(players.filter((p) => p.id !== player.id));
    });
  };

  ////////////////////////////////////////////////////////////

  // Fetchs all players/////////////////////////////////////
  async function fetchAllTagPLayers() {
    const results = await getAllTagPlayers();
    setPlayers(results);
  }
  ////////////////////////////////////////////////////////////



  function logout() {
    window.localStorage.removeItem("token");
    setToken("");
    setUser({});
    navigate("/");
  }

  async function fetchAllUsers() {
    const results = await getAllUsers();
   
    setUsers(results);
  }

  //USE EFFECT START

  useEffect(() => {
    fetchAllUsers();
   
  }, []);

  useEffect(() => {
    
    fetchAllTagPLayers();
  }, []);

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="main-routes-div">

<Navbar logout={logout} token={token} user={user} players={players}  fetchAllTagPLayers={fetchAllTagPLayers} />


      <Routes>
        <Route
          path="/"
          element={
            <RankingTable
              token={token}
              user={user}
              users={users}
              players={players}
              fetchAllUsers={fetchAllUsers}
              fetchAllTagPLayers={fetchAllTagPLayers}
              onRoundSubmit={onRoundSubmit}
              onDeletePlayer={onDeletePlayer}
              onAddPlayer={onAddPlayer}
              logout={logout}
            />
          }
        />

        <Route
          path="/login"
          element={<Login navigate={navigate} setToken={setToken} />}
        />

        <Route
          path="/register"
          element={
            <Register token={token} navigate={navigate} setToken={setToken} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
