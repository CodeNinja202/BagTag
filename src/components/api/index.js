const baseURL = 'https://salty-wave-36392-49aa67c14bad.herokuapp.com/api'


//Fetch API Calls to the server

//registers the users to the server
export const registerUser = async (email, username, password) => {
  try {
    console.log(email, username, password)
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    })

    const result = await response.json();
    //   console.log(result)
    return result;

  } catch (error) {
    console.error(error);
    throw error;
  }
}


//login users to the server 
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      const result = await response.json();
      
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  export const getAllUsers = async () => {
    try {
        const response = await fetch(`${baseURL}/users`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const results = await response.json();
  
        return results;
    } catch(ex) {
        console.error('Error getting all users', ex)
        throw ex;
    }
  }

//gets users stored to the database
  export const getUserDetails = async (token,) => {
    // console.log('Testing Token in API: ', token)
      try {
        const response = await fetch(`${baseURL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
    
        const result = await response.json();
        return result;
    
      } catch (ex) {
        console.log('error gettings user details in API', ex)
        throw ex;
      }
  
  }

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
      
      return results;
    } catch (ex) {
      console.log("error updating bagTag", ex);
    }
  };
  