require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateRegisterPost,
  validateLoginPost,
  generateToken,
  isValid,
} = require("../middleware/authUsers-middleware");
const secret = require("../secret/jwt_secret");
const Users = require("../users/users-model.js");

//POST /api/auth/register ---> REGISTER a new user
// {username: "", password: ""}
router.post("/register", validateRegisterPost(), (req, res, next) => {
  const user = req.body;

  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;

  Users.addUser(user)
    .then((newUser) => {
      const token = generateToken(newUser);
      res.status(201).json({ new_user_created: newUser });
    })
    .catch((err) => {
      res.status(500).json({ message: `${user.username} taken` });
    });
});

//POST /api/auth/login
// {username: "", password: ""}
router.post("/login", validateLoginPost(), (req, res, next) => {
  const credentials = req.body;

  Users.findBy({ username: credentials.username })
    .then((user) => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `welcome ${user.username}, have a cookie`,
          token,
        });
      } else {
        res
          .status(401)
          .json({ wrong_credentials: `check username or password` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "500 server error, can't login " });
    });
});

module.exports = router;
