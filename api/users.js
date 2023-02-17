const express = require("express");
const router = express.Router();


//requires all user Database functions
const {
  getUserByUsername,
  createUser,
  getAllUsers,
  getUserById,
  getUser,
} = require("../db/users");
///////////////////////////////////////////////////

const { JWT_SECRET }  = process.env;//rquires the secret
const { requireUser } = require('./utils')//throws an error if a user is not logged in


const bcrypt = require("bcrypt");//encrypts the password
const jwt = require("jsonwebtoken");// reuqires the token


//Get all users from the database
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();

    res.send(allUsers);
  } catch (error) {
    next(error);
  }
});
//////////////////////////////////////////////

//Login route
router.post('/login', async (req, res, next) => {
  
  try {
    const { username, password } = req.body;
    console.log("TESTING USERNAME LINE 30", username);
    if (!username || !password) {
      res.send({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
    const user = await getUserByUsername(username);
    console.log("TESTING USER______", user);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log(process.env.JWT_SECRET)
    if (user && isValid) {
      const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);

      res.send({ message: "you're logged in!", token });

    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
////////////////////////////////////////////////////////////////



//Registers a user to the database
router.post('/register', async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);
    const user = await createUser({
      email,
      username,
      password
    });

    if (_user) {
      res.send({
        error: 'error',
        name: 'UserExistsError',
        message: `A user by that ${username} already exists`
      });
    }

    const token = jwt.sign({
      id: user.id,
      username
    }, JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({
      message: "you're signed up!", token, user
    });

  } catch (error) {
    next(error)
  }
});
////////////////////////////////////////////////////////////////

//Reuires a user from the server
router.get('/me', requireUser, async (req, res, next) => {
    const user = req.user;
    console.log(user)
    res.send(user);
  
    next();
  
});



//Gets a user by ID
router.get('/:id', requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    console.log("GETTING USERS HERE", user)
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;