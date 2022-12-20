const { client } = require('./client');



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

async function updateBagRanking( id, fields = {}) {

  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    console.log("setstring: ", setString)

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

module.exports = {
  deleteTag,
  createNewStandings,
  getBagTagPlayerById,
  updateBagRanking,
  getAllBagTagRankings
}