const { client } = require('./client');// requires the client


// gets all data from teh players data table
async function getAllBagTagRankings() {
  try {
    console.log('DB Bag ADAPTER')
    const { rows } = await client.query(`
    SELECT * FROM players;
    
    `);
// ORDER BY id ASC;
    return rows;

  } catch (error) {
    throw error;
  }
}
////////////////////////////////////////////////////////////////



// Gets all players by ID
async function getBagTagPlayerById(id) {
  try {
    const { rows: [tag] } = await client.query(`
      SELECT * FROM players
      WHERE id = ${id}
    `);

    return tag;

  } catch (error) {
    throw error;
  }
}
////////////////////////////////////////////////////////////////


// Creates a new player on the bag tag standings table
async function createNewStandings({name, bagTag}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO players (name, "bagTag")
      VALUES ($1, $2)
      RETURNING *;
    `, [name, bagTag])
    
    return product;
  }
  catch(ex) {
    console.log('error in creating bagTag adapter function',ex)
  }
}
////////////////////////////////////////////////////////////////


// Updates players info, name and bagtag number
async function updateBagRanking(id, fields = {}) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length > 0) {
      await client.query(
        `
         UPDATE players
         SET ${setString}
         WHERE id=${id}
         RETURNING *;
       `,
        Object.values(fields)
      );

      return await getBagTagPlayerById(id);
    }
  } catch (error) {
    throw error;
  }
}
////////////////////////////////////////////////////////////////

//Delete player from database
async function deleteTag(id) {

  try {
    const { 
      rows: [tag] 
    } = await client.query(`
      DELETE FROM players 
      WHERE id = ${id}
      RETURNING *;
    `);

    return tag;

  } catch (error) {
    throw error;
  }
}
////////////////////////////////////////////////////////////////


// updates a players bagtag number
async function updateBagTag(id, bagTag) {
  try {
    await client.query(
      `
       UPDATE players
       SET "bagTag"=$1
       WHERE id=$2
       RETURNING *;
     `,
      [bagTag, id]
    );
    
    return await getBagTagPlayerById(id);
  } catch (error) {
    throw error;
  }
}

////////////////////////////////////////////////////////////////




// Exports all functions 
module.exports = {
  updateBagTag,
  deleteTag,
  createNewStandings,
  getBagTagPlayerById,
  updateBagRanking,
  getAllBagTagRankings
}