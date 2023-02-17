const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserByUsername,
  getAllUsers,
  getUserById,
} = require("../db/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const refreshTokens = {};
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.send({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
    }

    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (user && isValid) {
      // Generate access and refresh tokens
      const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
        expiresIn: "3s",
      });
      const refreshToken = jwt.sign({ id: user.id, username }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Store the refresh token on the server and associate it with the user's ID
      refreshTokens[refreshToken] = user.id;

      res.send({ message: "you're logged in!", token, refreshToken });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);
    const user = await createUser({
      email,
      username,
      password,
    });

    if (_user) {
      res.send({
        error: "error",
        name: "UserExistsError",
        message: `A user by that ${username} already exists`,
      });
    }

    // Generate access and refresh tokens
    const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
      expiresIn: "3s",
    });
    const refreshToken = jwt.sign({ id: user.id, username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Store the refresh token on the server and associate it with the user's ID
    refreshTokens[refreshToken] = user.id;

    res.send({
      message: "you're signed up!",
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});







router.get("/me", async (req, res, next) => {
  const user = req.user;
  console.log(user);
  res.send(user);

  next();
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    console.log("GETTING USERS HERE", user);
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});



router.post("/refresh", async (req, res, next) => {
  try {
    // Get the refresh token from the request body
    const refreshToken = req.body.refreshToken;

    // Check if the refresh token is valid (i.e. it exists in the "refreshTokens" object)
    if (!refreshToken || !refreshTokens[refreshToken]) {
      throw {
        name: "InvalidTokenError",
        message: "Invalid or expired refresh token",
      };
    }

    // Get the user ID associated with the refresh token
    const userId = refreshTokens[refreshToken];

    // Get the user from the database
    const user = await getUserById(userId);

    // Generate a new JWT for the user
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "3s",
    });

    // Send the new JWT to the client
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;