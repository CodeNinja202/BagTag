const http = require("http")

const app = require("./app")

const { PORT = 3001 } = process.env
const server = http.createServer(app)
 
server.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  )
})