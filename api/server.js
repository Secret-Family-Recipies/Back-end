// express server 


// global middleware
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")



// express router imports here


const server = express()

// in action
server.use(helmet())
server.use(express.json())
server.use(cors())


server.get("/", (req, res) => {
res.json({api: "up"})
})

module.exports = server