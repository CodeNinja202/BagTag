const express = require("express");
const router = express.Router();
const {
  getUserByUsername,
  createUser,
  getAllUsers,
  getUserById,
  getUser,
} = require("../db/users");

const { JWT_SECRET }  = process.env; //contects the secret from .env file
const { requireUser } = require('./utils')//requires the user to perform an action

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//endpoint that gets all users stored the to database
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();

    res.send(allUsers);
  } catch (error) {
    next(error);
  }
});
//////////////////////////////////////////////////////

//endpoint that allows users to login if they have a token
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
   
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
   //checks if the password matched with the hashpassword
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
//////////////////////////////////////////////////////


//endpoint that registers a users and attached a token to the user
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
/////////////////////////////////////////////////////



//endpoint that gets a users by their ID
router.get('/:id', async (req, res, next) => {
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