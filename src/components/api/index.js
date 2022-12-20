const baseURL = 'http://localhost:3001/api'


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