const baseURL = 'http://localhost:3001/api'


//Fetch API Calls to the server


//Gets all the players on the leaderboard
export const getAllTagPlayers = async () => {
    try {
      const response = await fetch(`${baseURL}/bagtag`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const results = await response.json();
  
      return results;
    } catch (ex) {
      console.error('Error getting all tag players', ex)
      throw ex;
    }
  }
////////////////////////////////////////////////////////////////

//Adds a new player to the leaderboard
  export const addPlayer = async (player) => {
    try {
      const response = await fetch(`${baseURL}/bagtag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      });
      const result = await response.json();
  
      return result;
    } catch (ex) {
      console.error('Error adding player', ex);
      throw ex;
    }
  }
  ////////////////////////////////////////////////////////////////

  //Deletes a player from the leaderboard

  export const deleteTagPlayer = async (playerId) => {
    try {
      const response = await fetch(`${baseURL}/bagtag/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
  
      return result;
    } catch (ex) {
      console.error(`Error deleting tag player with id ${playerId}`, ex);
      throw ex;
    }
  }
//Updates a players bagtag number on the leaderboard
  export const updateBagTag = async (playerId, updatedPlayer) => {
    try {
      const response = await fetch(`${baseURL}/bagTag/${playerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bagTag: updatedPlayer.bagTag,
        }),
      });
  
      const results = await response.json();
      console.log(results);
      return results;
    } catch (ex) {
      console.log("error updating bagTag", ex);
    }
  };
  