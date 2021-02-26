// server file here
require("dotenv").config()

const server = require("./api/server")

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server running on ${port}`))