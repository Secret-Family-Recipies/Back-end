// express server
const { restrict } = require("../middleware/authUsers-middleware");

// global middleware
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// express router imports here
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const recipeRouter = require("./recipes/recipes-router");

const server = express();

// in action
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

//server endpoints --->
server.use("/api/auth", authRouter);
server.use("/api/users", restrict(), usersRouter);
server.use("/api/recipes", restrict(), recipeRouter);

module.exports = server;
