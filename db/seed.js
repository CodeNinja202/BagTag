const { client } = require("./client");

const {

  createUser,
  getAllUsers,
  getUserByUsername,
  getUser,
  getUserById,
} = require("./users");

const { deleteTag,
  createNewStandings,
  getBagTagPlayerById,
  updateBagRanking,
  getAllBagTagRankings } = require("./bagtags");
//DROP TABLE
async function dropTables() {
  try {
    console.log("Dropping Tables");
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS players;
    `);

    console.log("Finished Dropping Tables");
  } catch (ex) {
    console.log("error dropping tables", ex);
  }
}
//CREATE TABLE
async function createTables() {
  try {
    console.log("Creating Tables");
    // add code here
    await client.query(`
      CREATE TABLE players (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        "bagTag" VARCHAR(255)
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

    `);

    console.log("Finished Creating Tables");
  } catch (ex) {
    console.log("error creating tables", ex);
  }
}
// CREATE INITIAL tag ranking board
async function createInitialTags() {
  try {
    console.log("Creating tags");
    await createNewStandings({
      name: "User One",
      bagTag: "1",
    });

    await createNewStandings({
      name: "User Two",
      bagTag: "2",
    });

    await createNewStandings({
      name: "User Three",
      bagTag: "3",
    });

    console.log("Finished creating Tags",);
  } catch (ex) {
    console.log("error creating Tags", ex);
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");

  try {
    const usersToCreate = [
      {
        email: "matthew@email.com",
        username: "matthew",
        password: "password",
        isAdmin: true,
      },
      {
        email: "ross@email.com",
        username: "ross",
        password: "password",
        isAdmin: true,
      },
      {
        email: "claire@email.com",
        username: "claire",
        password: "password",
        isAdmin: true,
      },
      {
        email: "jaeln@email.com",
        username: "jaeln",
        password: "password",
        isAdmin: true,
      },
      {
        email: "ethan@email.com",
        username: "ethan",
        password: "password",
        isAdmin: true,
      },
      {
        email: "admin@email.com",
        username: "admin",
        password: "administrator123",
        isAdmin: true,
      },
      { email: "default1@email.com", username: "albert", password: "bertie99" },
      {
        email: "default2@email.com",
        username: "sandra",
        password: "sandra123",
      },
      {
        email: "default3@email.com",
        username: "glamgal",
        password: "glamgal123",
      },
    ];
    const users = await Promise.all(
      usersToCreate.map(async (user) => {
        const result = await createUser(user);
        // console.log(result)
        return result;
      })
    );

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!", error);
    throw error;
  }
}

//--START TESTING DB--
async function testDB() {
  try {

      // --TESTING GET ALL USER--
    //  const result = await getAllUsers()
    //  console.log("TESTING GET ALL USERS LINE 402",result)
     //--------------------------------------------

      //--TESTING GET USER BY USERNAME--
    //  const result = await getUserByUsername('ross')
    //  console.log("TESTING GET USER BY USER NAME DB", result)
    //--------------------------------------------

     // --TESTING GET USER----------
    // const result = await getUser("matthew", "password")
    // console.log("line 414", result)
     //--------------------------------------------

     // --TESTING GET USER BY ID-----------
    // const result = await getUserById(1)
    // console.log(result)
    //--------------------------------------------

    //--TESTING GET ALL PRODUCTS----------
    // const allProducts = await getAllProducts();
    //  console.log("TESTING GET ALL PRODUCTS___-----___", allProducts)
    //--------------------------------------------


    //---TESTIN GET PRODUCT BY ID-------------------
    // console.log("testing getting product by id");
    // const result = await getProductById(1);
    // console.log(result);
    //--------------------------------------------
     // Test updatePassword function

        //--TESTING UPDATE PRODUCTS----------
    // const allProducts = await getAllProducts();
    // console.log('testing updating product')
    // const result = await updateProduct(allProducts[0].id, {
    //   title: "meh",
    //   description: 'eeee',
    // })
    // console.log(result);
    //--------------------------------------------

    //--TESTING DELETE PRODUCTS-------------
    // console.log('testing deleting product')
    // const result = await deleteProduct(4)
    // console.log(await getAllProducts())
    //--------------------------------------------

  } catch (error) {
    console.log("Error during testDB", error);
    throw error;
  }
}
//BUILD DB
async function buildDB() {
  try {
    // need to add something here
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialTags();
  } catch (ex) {
    console.log("Error building the DB", ex);
    throw ex;
  }
}

buildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());