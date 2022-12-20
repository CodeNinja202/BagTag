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